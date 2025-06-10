import { axiosInstance } from '@/lib/axios-instance'
import { useQuery } from '@tanstack/react-query'
import type { PaginationState, SortingState } from '@tanstack/react-table';

interface useGetTasksProps {
  pagination: PaginationState;
  sorting: SortingState;
}

export function useGetTasks({ pagination, sorting }: useGetTasksProps) {
  function getQueryParams() {
    const queryPagination: string = `page=${pagination.pageIndex}&size=${pagination.pageSize}`;

    const sortMapping: string[] = sorting.map((column) => {
      return `sort=${column.id},${ column.desc ? 'desc' : 'asc' }`
    });

    const querySorting: string = sortMapping.join('&');

    return `?${queryPagination}&${querySorting}`;
  }


  return useQuery({
    queryFn: async () => {
      try {
        const query: string = getQueryParams();
        const response = await axiosInstance.get(`/tasks${query}`);
        return response.data;
      } catch(e) {
        console.log(e);
        return [];
      }     
    },
    queryKey: ['tasks', pagination, sorting],
  });
}