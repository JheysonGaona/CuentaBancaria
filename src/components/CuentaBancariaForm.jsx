import React, { useEffect, useState } from "react";
import "./CuentaBancariaForm.css";

function CuentaBancariaForm({ cuentaEditada, onGuardar, onCancelar }) {
  const cuentaInicial = {
    id: null,
    nombre: "",
    identificacion: "",
    email: "",
    numeroCuenta: "",
    tipoCuenta: "AHORROS",
    saldo: 0,
    estadoCuenta: "ACTIVO",
    fechaApertura: "",
  };

  const [cuenta, setCuenta] = useState(cuentaInicial);

  useEffect(() => {
    if (cuentaEditada) {
      setCuenta(cuentaEditada);
    }
  }, [cuentaEditada]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCuenta({ ...cuenta, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar(cuenta);
    setCuenta(cuentaInicial);
  };

  return (
    <div className="form-container">
      <h2>{cuenta.id ? "Editar Cuenta" : "Registrar Cuenta"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre:</label>
          <input name="nombre" value={cuenta.nombre} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Identificación:</label>
          <input name="identificacion" value={cuenta.identificacion} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input name="email" type="email" value={cuenta.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Número de Cuenta:</label>
          <input name="numeroCuenta" value={cuenta.numeroCuenta} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Tipo de Cuenta:</label>
          <select name="tipoCuenta" value={cuenta.tipoCuenta} onChange={handleChange} required>
            <option value="AHORROS">AHORROS</option>
            <option value="CORRIENTE">CORRIENTE</option>
            <option value="EFECTIVA">EFECTIVA</option>
            <option value="OTRO">OTRO</option>
          </select>
        </div>
        <div className="form-group">
          <label>Saldo:</label>
          <input type="number" name="saldo" value={cuenta.saldo} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Estado:</label>
          <select name="estadoCuenta" value={cuenta.estadoCuenta} onChange={handleChange} required>
            <option value="ACTIVO">ACTIVO</option>
            <option value="INACTIVO">INACTIVO</option>
          </select>
        </div>
        <button type="submit">Guardar</button>
        <button type="button" onClick={onCancelar}>Cancelar</button>
      </form>
    </div>
  );
}

export default CuentaBancariaForm;
