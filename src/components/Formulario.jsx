import { useState, useEffect } from 'react';
import Error from './Error';

const Formulario = ({pacientes, setPacientes, paciente, setPaciente}) => {
  //El state debe ser declarado dentro del componente, en la parte superior, antes del return
  const [nombre, setNombre] = useState(''); //Dentro del useState se pone el valor inicial del state
  const [propietario, setPropietario] = useState(''); //Dentro del useState se pone el valor inicial del state
  const [email, setEmail] = useState(''); //Dentro del useState se pone el valor inicial del state
  const [fecha, setFecha] = useState(''); //Dentro del useState se pone el valor inicial del state
  const [sintomas, setSintomas] = useState(''); //Dentro del useState se pone el valor inicial del state
  const [error, setError] = useState(false);

  useEffect(() => { //Escucha los cambios que se ejecutan en paciente
    if(Object.keys(paciente).length > 0){//Comprobamos lo que tenga el objeto
      /**Pasamos los valores del objeto del paciente a editar al formulario */
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
    }
  }, [paciente]); //Este useEffect solo se ejecuta cuando 'paciente' haya cambiado


  const generarId = () => {
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36);

    return random+fecha;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    //Validación del formulario
    if ([nombre, propietario, email, fecha, sintomas].includes('')) { //Si un elemento del arreglo está vacío... 
      console.log('There is at least one empty field.');
      setError(true);
      return; //Cierra el bloque de código y no ejecuta el setError
    } 
    setError(false); //Cambia el estado de la alerta a false, y esta no se imprime

    //Objeto de pacientes
    const objetoPaciente = {
      nombre, 
      propietario, 
      email, 
      fecha, 
      sintomas
    }

    if(paciente.id){ //Si en el objeto de paciente existe un id
      //Editando el registro           
      objetoPaciente.id = paciente.id; //El registro del paciente a editar es igual al paciente del formulario

      const pacientesActualizados  = pacientes.map( pacienteState => pacienteState.id === 
        paciente.id ? objetoPaciente : pacienteState);

        setPacientes(pacientesActualizados); //Pasamos a setPacientes el nuevo arreglo
        setPaciente({}); //Vaciamos el paciente anterior (antes de actualizarse) y lo pasamos a ser un objeto vacío
    }else{
      //Nuevo registro
      objetoPaciente.id = generarId(); //Generamos el id del nuevo registro
      setPacientes([...pacientes, objetoPaciente]); //Lo agregamos a objetosPacientes
    }

    //console.log(objetoPacientes) //Método inmutable que genera una copia del arreglo original 
    //setPacientes([...pacientes, objetoPaciente]) //Tomamos una copia del arreglo pacientes y le pasamos el objetoPacientes
    //Reiniciamos el formulario
    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')

  }

  return (
    <div className="md:w-1/2 lg:w-2/5">
      <h2 className="font-black text-3xl text-center">Patient Follow-up</h2>
      <p className="text-lg mt-5 text-center mb-10">
        Add patients and {""}
        <span className="text-indigo-600 font-bold">Manage them</span>
      </p>

      <form
        onSubmit={handleSubmit} //Registramos evento onSubmit
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
      >
        { error && <Error><p>All fields are mandatory</p></Error> }
        <div className="mb-5">
          <label className="block text-gray-700 uppercase font-bold" htmlFor="nombreMascota">
            Name of your puppet:
          </label>
          <input
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            type="text"
            name="mascota"
            id="nombreMascota"
            placeholder="Name of the puppet"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)} //Por medio de un callback escuchamos el evento, y su valor lo asignamos al state por medio de la función modificadora
          />
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 uppercase font-bold" htmlFor="nombrePropietario">
            Name of the owner:
          </label>
          <input
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            type="text"
            name="propietario"
            id="nombrePropietario"
            placeholder="Name of the owner"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)} //Por medio de un callback escuchamos el evento, y su valor lo asignamos al state por medio de la función modificadora
          />
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 uppercase font-bold" htmlFor="email">
            Email:
          </label>
          <input
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            type="email"
            name="email"
            id="email"
            placeholder="Email of the owner"
            value={email}
            onChange={(e) => setEmail(e.target.value)} //Por medio de un callback escuchamos el evento, y su valor lo asignamos al state por medio de la función modificadora
          />
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 uppercase font-bold" htmlFor="alta">
            Date of medical discharge:
          </label>
          <input
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            type="date"
            name="alta"
            id="alta"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)} //Por medio de un callback escuchamos el evento, y su valor lo asignamos al state por medio de la función modificadora
          />
        </div>
        <div className="mb-5">
          <label className="text-gray-700 uppercase font-bold" htmlFor="sintomas">
            Symptoms:
          </label>
          <textarea
            id="sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Describe the symptoms of the patient."
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)} //Por medio de un callback escuchamos el evento, y su valor lo asignamos al state por medio de la función modificadora
          />
        </div>
        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold cursor-pointer hover:bg-indigo-700 transition-all"
          value={paciente.id ? 'Edit patient' : 'Add patient'} //Si existe un paciente, lo edita, si no, lo agrega
        />
      </form>
    </div>
  )
}

export default Formulario

/**
 * shortcuts: rfce y rafce
 * 
 */