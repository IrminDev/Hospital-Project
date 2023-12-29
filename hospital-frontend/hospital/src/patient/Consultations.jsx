import React from 'react'

const Consultations = () => {
  return (
    <div>
        <Header>
            <HeaderLink text={'Citas'} url={'/home'} />
            <HeaderLink text={'Consultas'} url={'/pacient/consultations'} />
            <HeaderLink text={'Compras'} url={'/pacient/purchases'} />
            <HeaderLink text={'Perfil'} url={'/pacient/profile'} />
        </Header>
    </div>
  )
}

export default Consultations