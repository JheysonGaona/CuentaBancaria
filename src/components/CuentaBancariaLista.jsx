import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CuentaBancariaForm from './CuentaBancariaForm';

const API_URL = 'http://localhost:8081/api/cuentas';

export default function CuentaBancariaLista() {
  const [cuentas, setCuentas] = useState([]);
  const [cuentaEditada, setCuentaEditada] = useState(null);

  const cuentaVacia = {
    nombre: '',
    identificacion: '',
    email: '',
    numeroCuenta: '',
    tipoCuenta: 'AHORROS',
    saldo: 0,
    estadoCuenta: 'ACTIVO',
    fechaApertura: ''
  };

  const cargarCuentas = async () => {
    const res = await axios.get(API_URL);
    setCuentas(res.data);
  };

  const guardarCuenta = async (cuenta) => {
    try {
      if (cuenta.id) {
        await axios.put(`${API_URL}/${cuenta.id}`, cuenta);
      } else {
        await axios.post(API_URL, cuenta);
      }
      setCuentaEditada(null);
      cargarCuentas();
    } catch (err) {
      console.error('Error al guardar:', err);
    }
  };

  const eliminarCuenta = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    cargarCuentas();
  };

  useEffect(() => {
    cargarCuentas();
  }, []);

  return (
    <div className="main-container">
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Cuentas Bancarias</h2>
    <div class="wrapper">
      <div className="flex-container">
        <div className="form-wrapper">
          <CuentaBancariaForm
            cuentaEditada={cuentaEditada || cuentaVacia}
            onGuardar={guardarCuenta}
            onCancelar={() => setCuentaEditada(null)}
          />
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Identificación</th>
                <th>Email</th>
                <th>Nro Cuenta</th>
                <th>Tipo</th>
                <th>Saldo</th>
                <th>Estado</th>
                <th>Fecha Apertura</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cuentas.map((c) => (
                <tr key={c.id}>
                  <td>{c.nombre}</td>
                  <td>{c.identificacion}</td>
                  <td>{c.email}</td>
                  <td>{c.numeroCuenta}</td>
                  <td>{c.tipoCuenta}</td>
                  <td>{c.saldo}</td>
                  <td>{c.estadoCuenta}</td>
                  <td>{c.fechaApertura}</td>
                  <td>
                    <button className="btn-editar" onClick={() => setCuentaEditada(c)}>Editar</button>
                    <button className="btn-eliminar" onClick={() => eliminarCuenta(c.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </div>
  );
}
