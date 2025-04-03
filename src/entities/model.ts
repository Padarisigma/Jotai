import { atom } from 'jotai'
import { Todo } from './types'

export const todosAtom = atom<Todo[]>([
	{
		id: 1,
		title: "Complete the project",
		description: "This is a description",
		completed: false
	},
	{
		id: 2,
		title: "Read a book",
		description: "This is a description",
		completed: false
	},
	{
		id: 3,
		title: "Go for a walk",
		description: "This is a description",
		completed: false
	},
	{
		id: 4,
		title: "Write an article",
		description: "This is a description",
		completed: true
	},
	{
		id: 5,
		title: "Exercise",
		description: "This is a description",
		completed: false
	},
	{
		id: 6,
		title: "Call a friend",
		description: "This is a description",
		completed: false
	},
	{
		id: 7,
		title: "Plan the weekend",
		description: "This is a description",
		completed: true
	},
	{
		id: 8,
		title: "Cook dinner",
		description: "This is a description",
		completed: false
	},
	{
		id: 9,
		title: "Watch a tutorial",
		description: "This is a description",
		completed: false
	},
	{
		id: 10,
		title: "Meditate",
		description: "This is a description",
		completed: true
	}
]);
