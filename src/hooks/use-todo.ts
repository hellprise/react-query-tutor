import { useQuery } from '@tanstack/react-query'

import { todoService } from '../services'
import { QUERY_CONSTANTS } from '../utils'

export const useTodo = (id: string) => {
	const queries = useQuery(
		[QUERY_CONSTANTS.TODO, id],
		() => todoService.getById(id),
		{
			select: ({ data }) => data,
			onSuccess: data =>
				console.log(`Data fetched successfully. ${data.title}`),
			onError: (error: any) =>
				alert(
					`An error has occurred: ${
						error.response.status === 404
							? 'Item not found'
							: error.response.status
					}`
				),
			enabled: !!id, // the request will not be made until the enabled flag is set to true
			retry: 3, // the number of retries before failing the request
		}
	)

	return queries
}
