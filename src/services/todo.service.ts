import { api } from '../core/api'
import { ITodo, ITodoCreate } from '../interfaces/todo.interface'

export const todoService = {
	async getAll() {
		return api.get<ITodo[]>(`/todos/?_start=0&_limit=5`)
	},

	async getById(id: string) {
		return api.get<ITodo>(`/todos/${id}`)
	},

	async createTodo(title: string) {
		const todo: ITodoCreate = {
			title,
			completed: false,
			userId: 1,
			// id: Math.random(),
		}

		return api.post<any, any, ITodoCreate>(`/todos`, todo)
	},

	async removeTodo(id: string) {
		return api.delete<ITodo>(`/todos/${id}`)
	},
}
