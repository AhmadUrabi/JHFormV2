import { useState } from 'react';
import { useRouter } from 'next/router';

const Form = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

    const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      name,
      email,
      company,
      phone,
    };
    fetch('/api/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((response) => {
        if (response.status >= 400) {
          throw new Error('Bad response from server');
        }   else {
            clearForm();
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
            }, 3000);

        }
    }).catch((error) => {
      console.error(error);
    });
  };



  function clearForm() {
    setName('');
    setEmail('');
    setCompany('');
    setPhone('');
  }

  return (
    <>
    <form onSubmit={handleSubmit} className="p-6 w-2/3 mx-auto flex flex-col">
      <div className="mb-4 flex flex-row w-full gap-2">
        <div className="w-full">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name
            </label>
            <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="border border-gray-400  w-full p-2 rounded-md"
            required
            />
        </div>
        <div className="w-full">
            <label htmlFor="company" className="block text-gray-700 font-bold mb-2">
            Company
            </label>
            <input
            type="text"
            id="company"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            className="border border-gray-400 w-full p-2 rounded-md"
            required
            />
        </div>
      </div>
      <div className="mb-4 flex flex-row w-full gap-2">
        <div className="w-full">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
            </label>
            <input
            type="text"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="border border-gray-400  w-full p-2 rounded-md"
            required
            />
        </div>
        <div className="w-full">
            <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">
            Phone Number
            </label>
            <input
            type="text"
            id="phone"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className="border border-gray-400 w-full p-2 rounded-md"
            required
            />
        </div>
      </div>
      <button type="submit" className="bg-[#ac2342] text-white py-3 text-lg rounded-md justify-end w-1/3 mx-auto mt-4">
        Submit
      </button>
      
    </form>
    <button className="bg-[#ac2342] text-white py-3 text-lg rounded-md justify-end w-[calc(((2/9)*100%)-16px)] mx-auto mt-4" onClick={()=>{
        setShowLogin(true);
        }}>
        Client List
        </button>
    {showPopup ? (
        <div className="fixed z-10 overflow-y-auto right-4 top-4 bg-white p-6 rounded-md h-min w-min shadow-xl">
        <span className="text-xl w-max block">Client Added Successfully</span>
    
    </div>): null}
    {showLogin ? (
        <div className="fixed z-10 overflow-y-auto inset-0 p-6 rounded-md h-screen w-screen bg-gray-400/50 flex justify-center items-center" onClick={(e)=>{
            if (e.target == e.currentTarget) {
                setShowLogin(false);
            }
        }}>
            <div className="bg-white rounded-md p-6 w-1/3 mx-auto flex flex-col">
                <h1>Admin Password</h1>
        <input id="loginpass" type="password" className="border border-gray-400 w-full p-2 rounded-md" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
        <button className="bg-[#ac2342] text-white py-3 text-lg rounded-md justify-end w-1/3 mx-auto mt-4" onClick={()=>{
            if (password == 'password') {
                setShowLogin(false);
                router.replace('/data');
            } else {
                console.log('wrong password');
            }
        }}>
            Login
            </button>
    </div>
    </div>): null}
    </>
  );
};

export default Form;