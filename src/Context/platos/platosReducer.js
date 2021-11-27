 import {
	CREAR_PLATOS,
	OBTENER_PLATOS,
	EDITAR_PLATOS,
	BORRAR_PLATOS,
	OBTENER_PLATOID
} from '../../types'

export default (state, action)=>{
	switch(action.type){

		case CREAR_PLATOS:
			return{
				...state,
				plato: action.payload
			}

		case OBTENER_PLATOS:
			return{
				...state,
				platos: action.payload
			}
		
		case OBTENER_PLATOID:
			return{
				...state,
				plato: action.payload
			}
		
		case BORRAR_PLATOS:
			return{
				...state,
				platos: state.platos.filter(plato=> plato._id!==
				action.payload)
			}

		case EDITAR_PLATOS:
			return{
				...state,
				platos: state.platos.map(plato=>{
					if(plato._id === action.payload._id){
						const datos = {
							nombre: action.payload.nombre,
							descripcion: action.payload.descripcion,
							precio: action.payload.precio,
							imgURL: action.payload.imgURL,
							public_id: action.payload.public_id
						}
						return datos
					}
					return plato
				})
			}
		default:
			return state;
	}
}
