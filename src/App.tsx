import { useIsFetching, useQueryClient } from '@tanstack/react-query'

import { useCreateTodo, useTodo, useTodos } from './hooks'

import { useState } from 'react'
import { QUERY_CONSTANTS } from './utils'

const todoId = '1'

function App() {
	const [title, setTitle] = useState('')

	const countFetching = useIsFetching()

	console.log('countFetching', countFetching)

	const { data, isLoading, isSuccess, error, refetch } = useTodos()
	const {
		data: todo,
		isLoading: todoLoading,
		isSuccess: todoSuccess,
		// isFetching use when data is revalidate (example: when you choose any filter in eccomerce and the data is revalidate. In this situation isLoading won't work, but isFetching will work)
		error: todoError,
	} = useTodo(todoId)

	const { mutate } = useCreateTodo({
		refetch: refetch,
		setTitle: setTitle,
	})

	// const { data: deleteData } = useMutation(
	// [QUERY_CONSTANTS.DELETE_TODO, todoId],
	// 	() => todoService.remove(todoId),
	// 	{
	// 		onSuccess: () => refetch(),
	// 	}
	// ) // it's a simple way to refetch data (in this case, when the mutation is success, the data will be refetched).

	const queryClient = useQueryClient() // we can use this hook anywhere in the app, and we don't need to pass the queryClient as a prop to the component

	// but also we can use refetch function in button onClick event, etc.
	const refreshItems = () => {
		// refetch() // simple way to refetch data
		queryClient.invalidateQueries([QUERY_CONSTANTS.TODOS]) // another way to refetch data
	}

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(event.target.value)
	}

	const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		mutate(title)
	}

	if (error) return 'An error has occurred: ' + error
	if (todoError) return 'An error has occurred: ' + todoError

	return (
		<>
			<section
				style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}
			>
				<form onSubmit={submitHandler}>
					<h1>Create Todo</h1>

					<input
						type='text'
						placeholder='Title'
						value={title}
						onChange={handleChange}
					/>

					<button>Create</button>
				</form>

				<section>
					<h1>Todo list</h1>

					{isLoading || !isSuccess ? (
						<p>Loading todos...</p>
					) : (
						<section
							style={{
								display: 'grid',
								gridTemplateColumns: '1fr 1fr 1fr',
								gap: 20,
							}}
						>
							{data.length > 1 &&
								data.map(todo => (
									<div
										style={{ backgroundColor: 'lightgray', color: 'black' }}
										key={todo.id}
									>
										<h1 style={{ fontSize: 14 }}>
											{todo.id}: {todo.title}
										</h1>
										<p>{todo.completed ? 'Completed' : 'Not completed'}</p>
									</div>
								))}
						</section>
					)}
				</section>
			</section>

			<button onClick={refreshItems}>Refresh</button>

			{todoLoading || !todoSuccess ? (
				<p>Loading todo...</p>
			) : (
				<section>
					<div key={todo.id}>
						<h1>
							{todo.id}: {todo.title}
						</h1>
						<p>{todo.completed ? 'Completed' : 'Not completed'}</p>
					</div>
				</section>
			)}
		</>
	)
}

export { App }
