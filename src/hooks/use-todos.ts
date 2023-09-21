import { useQuery } from '@tanstack/react-query'

import { todoService } from '../services'

import { ITodo } from '../interfaces/todo.interface'

import { QUERY_CONSTANTS } from '../utils'

const initialData: { data: ITodo[] } = {
	data: [
		{
			id: 1,
			title: 'initial todo title',
			completed: false,
			userId: 1,
		},
	],
}

export const useTodos = () => {
	const queries = useQuery(
		[QUERY_CONSTANTS.TODOS],
		() => todoService.getAll(),
		{
			select: ({ data }) => data,
			initialData,
			staleTime: 1000 * 60 * 5, // 5 minutes (це час, поки данні будуть вважатися свіжими. Після цього часу, при перезавантажені застосунку дані будуть оновлені, якщо я правильно зрозумів. якщо ж час не минув, а застосунок перезавантажуєтсья - ці данні не будуть оновлюватися. теж, якщо я правильно зрозумів)
			cacheTime: 1000 * 60 * 5, // 5 minutes (це час, скільки дані будуть зберігатися у кеші. коли час мине - данні видаляться з нього)
			// onSuccess: data => alert(`Data fetched successfully. ${data.length} items`),
			onSuccess: data =>
				console.log(`Data fetched successfully. ${data.length} items`),
			onError: (error: any) =>
				alert(
					`An error has occurred: ${
						error.response.status === 404
							? 'Items not found'
							: error.response.status
					}`
				),
			enabled: true, // the request will not be made until the enabled flag is set to true
			retry: 3, // the number of retries before failing the request
		}
	)

	return queries
}
