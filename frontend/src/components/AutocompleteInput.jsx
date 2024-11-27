"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

export default function AutocompleteInput({ value, onChange, type }) {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (inputValue.length > 1) {
      const url = type === "producto"
        ? `http://localhost:3000/productos/buscarProductoPorNombre/${inputValue}`
        : `http://localhost:3000/usuarios/buscarUsuarioPorNombre/${inputValue}`;

      axios
        .get(url)
        .then((response) => {
          const data = response.data.map((item) => ({
            value: item.id,
            label: item.nombre,
          }));
          setOptions(data);
        })
        .catch((error) => {
          console.error("Error al obtener los datos:", error);
        });
    } else {
      setOptions([]);
    }
  }, [inputValue, type]);

  return (
    <div className="form-group">
      <Select
        value={value}
        onChange={onChange}
        options={options}
        onInputChange={(value) => setInputValue(value)}
        isClearable
        placeholder={`Buscar ${type === "producto" ? "producto" : "usuario"}`}
      />
    </div>
  );
}
