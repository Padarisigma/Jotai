import { atom } from 'jotai'
import { Todo } from './types'

export const todosAtom = atom<Todo[]>([
	{
		id: 1,
		title: "Do this task 1",
		description: "This is a description",
		completed: false
	},
	{
		id: 2,
		title: "Do this task 2",
		description: "This is a description",
		completed: false
	},
	{
		id: 3,
		title: "Do this task 3",
		description: "This is a description",
		completed: false
	}
])