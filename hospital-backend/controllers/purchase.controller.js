import { getConnection  } from "../database/connections";
import sql from 'mssql';

export const getPurchaseById = async (req, res) => {
    const pool = await getConnection()
    const result = await pool.request()
    .query("SELECT * FROM compras WHERE idPersona = " + req.params.id);

    const purchases = result.recordset;

    const groupedPurchases = purchases.reduce((acc, purchase) => {
        const key = purchase.idCompra;
        const existingPurchase = acc.find(item => item.idCompra === key);

        if (!existingPurchase) {
            acc.push({
                ...purchase,
                pedidos: purchase.medicamento ? [{
                    medicamento: purchase.medicamento,
                    cantidad: purchase.cantidad,
                    costo: purchase.costo
                }] : []
            });
        } else {
            if (purchase.medicamento) {
                existingPurchase.pedidos.push({
                    medicamento: purchase.medicamento,
                    cantidad: purchase.cantidad,
                    costo: purchase.costo
                });
            }
        }
        return acc;
    }, []);
    
    const groupedPurchasesArray = Object.values(groupedPurchases);


    res.json(groupedPurchasesArray);
}

export const getPurchases = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query("SELECT * FROM compras");

        const purchases = result.recordset;

        const groupedPurchases = purchases.reduce((acc, purchase) => {
            const key = purchase.idCompra;
            const existingPurchase = acc.find(item => item.idCompra === key);

            if (!existingPurchase) {
                acc.push({
                    ...purchase,
                    pedidos: purchase.medicamento ? [{
                        medicamento: purchase.medicamento,
                        cantidad: purchase.cantidad,
                        costo: purchase.costo
                    }] : []
                });
            } else {
                if (purchase.medicamento) {
                    existingPurchase.pedidos.push({
                        medicamento: purchase.medicamento,
                        cantidad: purchase.cantidad,
                        costo: purchase.costo
                    });
                }
            }
            return acc;
        }, []);

        res.json(groupedPurchases);
    } catch (error) {
        console.error("Error fetching purchases:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const createPurchase = async (req, res) => {
    const { patient, payment, orders } = req.body;
    const pool = await getConnection()
    try{
        const result = await pool.request()
        .input('patient', sql.Int, patient)
        .input('payment', sql.Int, payment)
        .execute('createPurchase')

        const purchase = result.recordset[0].idCompra;
        
        if (orders.length > 0) {
            await Promise.all(orders.map(async (order) => {
                await pool.request()
                    .input('id', sql.Int, purchase)
                    .input('medicine', sql.Int, order.id)
                    .input('quantity', sql.Int, order.quantity)
                    .execute('addOrder');
            }));
        }
    
        res.status(200).json({
            ok: true,
            message: 'Compra creada con éxito',
        });
    } catch(error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
        res.status(500).json({
            ok: false,
            message: 'Error on db',
            errors: error
        });
    }
}