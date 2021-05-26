import React, { useState } from 'react';
import { ModalDialog, Button } from 'vtex.styleguide';

const ModalAsignation = ({ nameProduct }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false)

  const handleOpen = () => {
    setIsModalOpen(!isModalOpen)
  }

  const handleConfirmation = () => {
    setLoading(!loading)
    setTimeout(() => {
      setIsModalOpen(!isModalOpen);
      setLoading(loading);
    },1500)
  }
  
  const handleCancelation = () => {
    setIsModalOpen(!isModalOpen);
  }

  return (
    <div>
      <Button onClick={handleOpen}>Asignar</Button>
      <ModalDialog
        centered
        loading={loading}
        confirmation={{
          onClick: handleConfirmation,
          label: 'Aceptar',
          isDangerous: false,
        }}
        cancelation={{
          onClick: handleCancelation,
          label: 'Cancelar',
        }}
        isOpen={isModalOpen}
        onClose={handleCancelation}>
        <div className="">
          <p className="f3 f3-ns fw3 gray">
            Asignación
          </p>
          <p>
            Por favor, Haga click en aceptar para asignar el producto <strong>{nameProduct}</strong>.
          </p>
        </div>
      </ModalDialog>
    </div>
  )
}

export default ModalAsignation;
