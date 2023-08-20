import { Button, TextField } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react'
// import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
// import IconButton from '@mui/material/IconButton';
// import Button from '@mui/material/Button';
// import ButtonGroup from '@mui/material/ButtonGroup';
import { useNavigate } from "react-router-dom";


export function Seats2() {
    const [selectedItems, setSelectedItems] = useState([]);
    const [email, setemail] = useState();
   
    return (
        <div className="seats">
            <p>TICKET PRICE-RS.200/-</p>
            <div className='seatarrenge'><div><Seat  selectedItems={selectedItems} setSelectedItems={setSelectedItems}email={email} setemail={setemail} /></div></div>
        </div>
    );
}

// function Seat() {
//     const button = Array(100).fill(<CheckBoxOutlineBlankIcon />)
//     return (
//         <div className="seatlist">
//             {button.map((btn, i) => <AvalSeat key={i} button={btn} />)}
//         </div>
//     )
// }

// function AvalSeat({ button, key }) {
//     const [active, setActive] = useState(true)

//     const handleClick = () => {

//         setActive(!active)
//         console.log("clicked")
//     }
//     return (
//         <div className="seats">
//             <IconButton arail-label={key} color={active ? "inherit" : "success"} onClick={handleClick}>{button}</IconButton>

//         </div>
//     )
// }

// function Booked() {
//     const navigate = useNavigate()
//     const booked = () => {
//         console.log("Clicked")
//         navigate("/ticketbooked")


//     }
//     return (
//         <Button color='success' variant="outlined" onClick={booked}>Book</Button>
//     )
// } 





function Seat({setSelectedItems,selectedItems,setemail,email}) {
    const navigate = useNavigate()
  
    const [message, setMessage] = useState('');
    // const [amu, setamu] = useState();
   let a= selectedItems.length*200
    // setamu(a)
  console.log(selectedItems);
  console.log(selectedItems.length*200)
  
  
  function handleChange(event) {
    let value = event.target.value;
    setemail(value)
  }  
  
  
    const handleCheckboxChange = (event) => {
      const itemName = event.target.value;
      const isChecked = event.target.checked;
      if (isChecked) {
        setSelectedItems(selectedItems.concat([itemName]));
      } else {
        setSelectedItems(selectedItems.filter((item) => item !== itemName));
      }
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      if(a===""){
        alert("please enter amu")
      }else{
        const options = {
          key: 'rzp_test_teSKDfmwTCTFu0',
          key_secret: "2TZaVrFSXYnzzu3QeH6N3t3w",
          amount: a*100, // amount in paise (10000 paise = ₹100)
          currency: 'INR',
          name: 'Book My show',
          description: 'Payment for booking',
          image: 'https://your-image-url.com/logo.png',
          handler: function () {
          
            // Handler function to handle success/failure response
            try{
              if(email&&selectedItems){
              fetch('https://ticketbooking-backend-peach.vercel.app/all/rrr1/update-items', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ itemNames: selectedItems,email:email})
              })
              setMessage("update success"+selectedItems);
              navigate("/movies")
            }else
            {navigate("/movies")}
            }
                  catch(error) {
                    console.error(error);
                    setMessage('An error occurred while updating items');
                  }
          },
          prefill: {
            name: "bharathi",
            email: email,
            contact: '9597102234 '
          },
          notes: {
            address: 'My Store, India'
          },
          theme: {
            color: '#F37254'
          }
        };
        var pay = new window.Razorpay(options)
              pay.open()
      
      }
  
      
  // try{
  //   if(email&&selectedItems){
  //   fetch('https://bookmyshow-backend.vercel.app/update-items', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ itemNames: selectedItems,email:email})
  //   })
  //   setMessage("update success"+selectedItems);
  //   navigate("/qr")
  // }else
  // {navigate("/qr")}
  // }
  //       catch(error) {
  //         console.error(error);
  //         setMessage('An error occurred while updating items');
  //       }
  
  
  
        
    };
    const [seat, setseat] = useState([]);
    useEffect(() => {
      fetch("https://ticketbooking-backend-peach.vercel.app/all/rrr1/allticket")
        .then((data) => data.json())
        .then((mvs) => setseat(mvs));
    }, []);
    console.log(seat);
    return (
        <div>
      <form onSubmit={handleSubmit}>
      <TextField className='email' type='email' placeholder='email'onChange = {handleChange} required></TextField>
      <br></br>
      <br></br>
        <div className='arrange'>
        {seat.map((e)=>(<div id={e.status}>
      
          <input  className={e.status} type="checkbox" value={e.name} onChange={handleCheckboxChange} />
          {e.name}
          
          </div>
         ))}
         </div>
        {/* <label>
          <input type="checkbox" value="Item 1" onChange={handleCheckboxChange} />
          Item 5
        </label>
        <label>
          <input type="checkbox" value="Item 2" onChange={handleCheckboxChange} />
          Item 7
        </label>
        <label>
          <input type="checkbox" value="Item 3" onChange={handleCheckboxChange} />
          Item 3
        </label>
        <label>
          <input type="checkbox" value="Item 4" onChange={handleCheckboxChange} />
          Item 8
        </label> */}
        <Button type="submit">Update items</Button>
      </form>
      {message && <p>{message}</p>}
     
    </div>
    )
}