import { useState, useEffect } from "react";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import ListadoPacientes from "./components/ListadoPacientes";

function App() {

  const [pacientes, setPacientes] = useState( JSON.parse(localStorage.getItem('pacientes')) ?? []); //Arreglo de pacientes
  const [paciente, setPaciente] = useState({}); //Paciente para boton editar
  //Función para eliminar pacientes
  const eliminarPaciente = (id) => {
    const pacientesActualizados = pacientes.filter( paciente => paciente.id !== id ); //Traemos a todos los pacientes con diferente id al del paciente actual
    setPacientes(pacientesActualizados); //Le pasamos al state los pacientes actuales, sin el eliminado
  }

  useEffect( () => {
    localStorage.setItem('pacientes', JSON.stringify(pacientes)); //Convertimos el arreglo de pacientes a un string
  }, [pacientes]);


  return (

    <div className="container mx-auto mt-20">
      <Header/>
      <div className="mt-12 md:flex">
        <Formulario
          pacientes={pacientes}    
          setPacientes={setPacientes}  //Props para enviar arreglo de pacientes   
          paciente={paciente}
          setPaciente={setPaciente}
        />
        <ListadoPacientes 
          pacientes={pacientes} //Le pasamos los pacientes
          setPaciente={setPaciente} //info del paciente a editar
          eliminarPaciente={eliminarPaciente} //Le pasamos la función eliminarPaciente al prop
        />
      </div>
    </div>
  )
}

export default App;

/**
 * JSX = JavaScript Syntax Extension
 * Es una extensión del lenguaje para React.
 * 
 * Reglas en JSX.
 * Si una etiqueta HTML tiene una apertura, debe también cerrar.
 * Cada componente debe haber un return.
 * En este return solo debe haber un elemento
 * 
 * ¿Qué es el State?
 * El State o Estado es básicamente eso, cuál es el 
 * estado de nuestra aplicación.
 * El Estado es una variable con información relevante en nuestra
 * aplicación de React, algunas veces el state pertenece a un
 * componente en específico o algunas veces deseas compartirlo a lo largo
 * de diferentes componentes.
 * El state es creado con la función useState
 * 
 * React reacciona en base al state.
 * Cada vez que el state cambia, la app se va a renderizar y actualizarse con esos cambios.
 * Para modificar el state, se utiliza la función que extraemos cuando declaramos el state en nuestro
 * componente.
 * 
 * REGLAS DE LOS HOOKS.
 * 1. No pueden ir fuera del componente.
 * 2. Tienen que ir inmediatamente después de declarada la función.
 * 3. No se pueden declarar dentro de condicionales.
 * 4. No se pueden declarar después de un return.
 * 
 * EVENTOS EN REACT.
 * La forma en que React maneja los eventos es muy similar a JS, con algunos cambios.
 * Los eventos son camelCase, es decir, en vez de onchange se utiliza onChange.
 * En lugar de onclick, se utiliza onClick.
 * 
 * ¿QUÉ SON LOS PROPS o PROPIEDADES?
 * El State o funciones que creas en tus componentes sólo estarán disponibles en ese componente.
 * Una forma de evitar duplicar código y reutilizar esas variables, state o stado y funciones 
 * en otros componentes es por medio de Props o Propiedades.
 * Los Props se pasan del padre al hijo, nunca se pueden pasar del hijo al padre.
 * Si tienes un state que se va a pasar por diferentes componentes, lo mejor es colocarlo
 * en el archivo principal.
 * 
 * Cada nivel de Componentes deberá tomar y pasar el Prop hacia otros componentes, tecnologías
 * como Redux o Content evitan tener que hacerlo de esta forma.
 * 
 * 
 * HOOK: useEffect
 * Después de useState es el más utilizado.
 * useEffect siempre es un callback, que se ejecuta cuando un state cambia
 * o cuando el componente está listo.
 * Es el sustituto de lo que antes era componentDidMount() y componentDidUpdate().
 * 
 * Usos de useEffect:
 * Al ejecutarse automáticamente cuando el componente está listo, es un excelente luga para colocar
 * código para consultar una API LocalStorage.
 * Debido a que podemos pasarle una dependencia y estar escuchando por los cambios que sucedan
 * en una variable, puede actualizar el componente cuando ese cambio suceda.
 */