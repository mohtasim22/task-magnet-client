import { useForm } from 'react-hook-form';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const TaskList = ({ tasks, listId, onDelete }) => {

  return (
    
    <Droppable droppableId={listId}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{
            background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
            padding: 8,
            width: 300,
            minHeight: 500,
            margin: 8,
            borderRadius: 8,
          }}
        >
          {tasks.map((task, index) => (
            <Draggable key={task._id} draggableId={task._id} index={index}>
              {(provided, snapshot) => (
                <div
                  className='task-tabb'
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={{
                    userSelect: 'none',
                    padding: 16,
                    margin: '0 0 8px 0',
                    minHeight: '50px',
                    backgroundColor: snapshot.isDragging ? '#69c0fa' : '#f87171',
                    color: 'white',
                    borderRadius: '4px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    ...provided.draggableProps.style,
                  }}
                >
                    <div className='flex-row task-tab'>
                        <div className='text-black font-bold'>{task.title}</div>
                        <div className='my-2'>{task.description}</div>
                        <div>Deadline: {task.date}</div>
                        <div>Priority: {task.priority}</div>
                    </div>
                  
                  <button className='border rounded-md py-1 px-2' onClick={() => onDelete(listId, task._id)}>Delete</button>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

const TaskForm = ({ onSubmit }) => {
  const { register, handleSubmit, reset } = useForm();
  const {user} = useContext(AuthContext);
  const handleFormSubmit = (data) => {
    onSubmit(data);
    console.log(data)
    const email= user.email;
    const title=data.title;
    const description=data.description;    
    const date=data.deadline;    
    const priority =data.priority;    
    const status ="todo";    
    const newTask={email,title,date,description,priority,status}   
    console.log(newTask);

    //send data to the server 
    fetch('https://task-management-server-ebon.vercel.app/tasks', {
        method: 'POST',
        headers:{
            'content-type':'application/json'
        },
        body: JSON.stringify(newTask)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.insertedId){
                toast("Task Created");
                window.location.reload();
            }
    })

    reset();
  };
    
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className='flex flex-col'>
      <label className='py-4'>
        Task Title:
        <input className='ml-3 border-2 rounded-md p-1' type="text" name='title' {...register('title', { required: true })} />
      </label>
      <label className='py-4 flex'>
        Description:
        <textarea className='ml-3 border-2 rounded-md p-1' name='description' {...register('description')} />
      </label>
      <label className='py-4'>
        Deadline:
        <input className='ml-3 border-2 rounded-md p-1' type="date" name='date' {...register('deadline')} />
      </label>
      <label className='py-4 mb-5'>
        Priority:
        <select className='ml-3 border-2 rounded-md p-1' name='priority' {...register('priority')}>
          <option value="low">Low</option>
          <option value="moderate">Moderate</option>
          <option value="high">High</option>
        </select>
      </label>
      <button className='btn' type="submit">Create Task</button>
    </form>
  );
};

const MyProfile = () => {
  const [tasks, setTasks] = useState({
    todo: [],
    ongoing: [],
    completed: [],
  });
  const {user}= useContext(AuthContext);
//   console.log(user.email)
  useEffect(() => {
    // Fetch tasks from API when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch(`https://task-management-server-ebon.vercel.app/tasks`);
        const data = await response.json();
        const filteredTasks = data.filter((task) => task.email === user?.email);
        console.log(filteredTasks)
        // Organize tasks into respective arrays based on their status
        const organizedTasks = {
          todo: [],
          ongoing: [],
          completed: [],
        };

        filteredTasks.forEach((task) => {
          switch (task.status) {
            case 'todo':
              organizedTasks.todo.push(task);
              break;
            case 'ongoing':
              organizedTasks.ongoing.push(task);
              break;
            case 'completed':
              organizedTasks.completed.push(task);
              break;
            default:
              // Handle unexpected status values if needed
              break;
          }
        });

        // Update state with the organized tasks
        setTasks(organizedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error.message);
      }
    };

    fetchData();
  }, []);

  const onDragEnd = async (result) => {
    if (!result.destination) {
      return;
    }
  
    const { source, destination } = result;
  
    // Extract the dragged task
    const draggedTask = tasks[source.droppableId][source.index];
  
    // Make an API request to update the task status
    try {
      const response = await fetch(`https://task-management-server-ebon.vercel.app/tasks/${draggedTask._id}`, {
        method: 'PUT', // Use the appropriate HTTP method for updating resources
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: destination.droppableId }),
      });
  
      if (response.ok) {
        // Update the frontend state after a successful API update
        const updatedTasks = { ...tasks };
        updatedTasks[source.droppableId].splice(source.index, 1);
        updatedTasks[destination.droppableId].splice(destination.index, 0, draggedTask);
        setTasks(updatedTasks);
      } else {
        console.error('Failed to update task status:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating task status:', error.message);
    }
  };
  

  const onDeleteTask = async (listId, taskId) => {
    // Make an API request to delete the task
    console.log(listId,taskId)
    try {
      const response = await fetch(`https://task-management-server-ebon.vercel.app/tasks/${taskId}`, {
        method: 'DELETE', // Use the appropriate HTTP method for deleting resources
      });
  
      if (response.ok) {
        // Update the frontend state after a successful API deletion
        const updatedTasks = { ...tasks };
        updatedTasks[listId] = updatedTasks[listId].filter((task) => task._id !== taskId);
        setTasks(updatedTasks);
      } else {
        console.error('Failed to delete task:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting task:', error.message);
    }
  };
  

  const onCreateTask = (data) => {
    // Generate a unique ID for the new task
    const newTaskId = `task${Date.now()}`;

    // Create the new task
    const newTask = {
      id: newTaskId,
      content: data.title,
      // Add other task details (description, deadline, priority) based on data
    };

    // Update the tasks
    setTasks((prevTasks) => ({
      ...prevTasks,
      todo: [...prevTasks.todo, newTask], // Assume new tasks are added to the "todo" list
    }));
  };

  return (
    <div>
        <h1 className='text-center font-bold text-2xl pb-2'>Create Tasks</h1>
      <TaskForm onSubmit={onCreateTask} />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className='mt-8 ' style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div>
            <h2 className='text-center font-bold text-2xl pb-2'>Todo</h2>
            <TaskList tasks={tasks.todo} listId="todo" onDelete={onDeleteTask} />
          </div>
          <div>
            <h2 className='text-center font-bold text-2xl pb-2'>Ongoing</h2>
            <TaskList tasks={tasks.ongoing} listId="ongoing" onDelete={onDeleteTask} />
          </div>
          <div>
            <h2 className='text-center font-bold text-2xl pb-2'>Completed</h2>
            <TaskList tasks={tasks.completed} listId="completed" onDelete={onDeleteTask} />
          </div>
        </div>
      </DragDropContext>
      <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            />
    </div>
  );
};

export default MyProfile;
