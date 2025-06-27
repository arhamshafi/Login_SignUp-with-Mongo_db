import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

function App() {
  const [login, setlogin] = useState(true);
  const [users, setUsers] = useState([]);
  const [backendData, setBackendData] = useState([]);
  console.log(backendData);
  

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = (data) => {
    if (!login) {
      const emailExists = users.some(user => user.email === data.email);
      if (emailExists) {
        alert("Email already exists!");
        return;
      }

      const newUser = {
        username: data.username,
        email: data.email,
        password: data.password
      };

      // Save in local state
      setUsers(prev => [...prev, newUser]);

      // Send to backend
      axios.post("http://localhost:5000/", newUser)
        .then((res) => {
          // console.log("Saved to DB:", res.data);
          setBackendData( [...backendData , res.data]);
        })
        .catch(err => {
          console.error("Error:", err.message);
        });

      console.log(backendData);


      reset();
    }

    // 🔐 LOGIN
    else {
      const foundUser = users.find(
        (u) => u.email === data.email && u.password === data.password
      );
      if (foundUser) {
        alert("Login Successful");
        console.log("Logged In User:", foundUser);
      } else {
        alert("Invalid Email or Password");
      }
    }
  };

  return (
    <div className='w-full min-h-screen bg-black py-1 select-none'>
      <form onSubmit={handleSubmit(onSubmit)} className='w-[500px] h-max py-3 bg-white pb-10 rounded-xl mx-auto mt-5'>
        <h1 className='text-center text-black font-bold mt-8 text-xl'>Registration Form</h1>

        {!login && (
          <div className="w-[90%] mx-auto mt-10">
            <input
              {...register("username", { required: !login })}
              placeholder='Username'
              type="text"
              className='w-full rounded-xl h-[45px] px-3 font-bold text-sm tracking-[2px] outline-none border-2 border-transparent focus:border-blue-500 bg-black/10'
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">Username is required</p>}
          </div>
        )}

        <div className={`w-[90%] mx-auto ${login ? "mt-10" : "mt-5"}`}>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Invalid email format"
              }
            })}
            placeholder='E-Mail'
            type="email"
            className='w-full rounded-xl h-[45px] px-3 font-bold text-sm tracking-[2px] outline-none border-2 border-transparent focus:border-blue-500 bg-black/10'
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div className="w-[90%] mx-auto mt-5">
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Minimum 8 characters"
              }
            })}
            placeholder='Password'
            type="password"
            className='w-full rounded-xl h-[45px] px-3 font-bold text-sm tracking-[2px] outline-none border-2 border-transparent focus:border-blue-500 bg-black/10'
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <div className='w-full relative mt-2'>
          <p
            className='text-black absolute top-[30%] right-9 font-bold text-sm underline hover:text-blue-600 cursor-pointer'
            onClick={() => {
              setlogin(!login);
              reset();
            }}
          >
            {login ? "Sign in" : "Login Your Account"}
          </p>
        </div>

        <button
          type="submit"
          className='w-[90%] block h-[45px] rounded-xl font-bold tracking-[2px] bg-black cursor-pointer text-white mx-auto mt-10 active:scale-95'
        >
          {login ? "Login" : "Sign up"}
        </button>
      </form>
    </div>
  );
}

export default App;
