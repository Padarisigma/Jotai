import { Button, Table, Modal, Input, Select, Checkbox } from 'antd';
import { useAtom } from 'jotai';
import { todosAtom } from '../entities/model';
import { Todo } from '../entities/types';
import { useState } from 'react';

const TodoTable = () => {
  const [todos, setTodos] = useAtom(todosAtom); 
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [newTodo, setNewTodo] = useState<Todo>({
    id: 0,
    title: '',
    description: '',
    completed: false,
  });
  const [search, setSearch] = useState('');

  const filteredTodos = todos.filter(
    (todo) =>
      todo.title.toLowerCase().includes(search.toLowerCase()) ||
      todo.description.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Название',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Статус',
      dataIndex: 'completed',
      key: 'completed',
      render: (completed: boolean, record: Todo) => (
        <Checkbox
          checked={completed}
          onChange={() => handleStatusChange(record.id, !completed)}
        />
      ),
    },
    {
      render: (record: Todo) => (
        <>
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button onClick={() => handleDelete(record.id)}>Delete</Button>
        </>
      ),
    },
  ];

  const handleDelete = (id: number) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const handleEdit = (todo: Todo) => {
    setIsEditing(true);
    setEditingTodo(todo);
    setNewTodo({ ...todo });
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    setIsEditing(false);
    setNewTodo({
      id: Math.max(...todos.map((t) => t.id)) + 1,
      title: '',
      description: '',
      completed: false,
    });
    setIsModalVisible(true);
  };

  const handleSave = () => {
    if (isEditing && editingTodo) {
      setTodos(
        todos.map((t) => (t.id === editingTodo.id ? { ...t, ...newTodo } : t))
      );
    } else {
      setTodos([...todos, newTodo]);
    }
    setIsModalVisible(false);
  };

  const handleStatusChange = (id: number, completed: boolean) => {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, completed } : t))
    );
  };

  return (
    <div className="main__todo">
      <div className='box__todo'>
        <h1>TodoTable with Jotai</h1>
        <Input
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 200 }}
        />
        <Button onClick={handleAdd}>Add +</Button>
      </div>

      <div className="todo__table">
        <Table columns={columns} dataSource={filteredTodos.map((t) => ({ ...t, key: t.id }))} />
      </div>

      <Modal
        title={isEditing ? 'Edit Todo' : 'Add Todo'}
        visible={isModalVisible}
        onOk={handleSave}
        onCancel={() => setIsModalVisible(false)}
      >
        <div>
          <div>
            <label>Title:</label>
            <Input
              value={newTodo.title}
              onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
            />
          </div>
          <div>
            <label>Description:</label>
            <Input
              value={newTodo.description}
              onChange={(e) =>
                setNewTodo({ ...newTodo, description: e.target.value })
              }
            />
          </div>
          <div>
            <label>Status:</label>
            <Select
              value={newTodo.completed ? 'Completed' : 'Not Completed'}
              onChange={(value) =>
                setNewTodo({
                  ...newTodo,
                  completed: value === 'Completed',
                })
              }
            >
              <Select.Option value="Completed">Completed</Select.Option>
              <Select.Option value="Not Completed">Not Completed</Select.Option>
            </Select>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TodoTable;
