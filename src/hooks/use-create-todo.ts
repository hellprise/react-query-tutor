import { useMutation } from '@tanstack/react-query'
import { todoService } from '../services'
import { QUERY_CONSTANTS } from '../utils'

interface IUseCreateTodoProps {
	setTitle: (title: string) => void
	refetch: any
}

export const useCreateTodo = ({ refetch, setTitle }: IUseCreateTodoProps) => {
	const mutation = useMutation(
		[QUERY_CONSTANTS.CREATE_TODO],
		(title: string) => todoService.createTodo(title),
		{
			onSuccess: () => {
				setTitle('')
				alert('Todo created!')
				refetch()
			},
		}
	)

	return mutation
}
