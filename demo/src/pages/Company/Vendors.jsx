import { useEffect, useState } from "react";
import axios from "axios";
import { FiUsers, FiCheckCircle, FiXCircle } from "react-icons/fi";
import ListPageTemplate from "../ListPageTemplate";


const API_URL = "http://localhost:3000/api/users";


const columns = [
  {
    key: "name",
    label: "Name"
  },
  {
    key: "email",
    label: "Email"
  },
  {
    key: "mobile",
    label: "Mobile"
  },
  {
    key: "role_id",
    label: "Role"
  },
  {
    key: "status",
    label: "Status"
  }
];


export default function UserPage() {


  const [users, setUsers] = useState([]);



  // GET USERS
  const getUsers = async () => {

    try {

      const response = await axios.get(API_URL);

      console.log("Users Data:", response.data);

      setUsers(response.data || []);

    } catch (error) {

      console.log(
        "Get Users Error:",
        error.response?.data || error.message
      );

    }

  };



  useEffect(() => {

    getUsers();

  }, []);




  // ADD USER
  const addUser = async (formData) => {

    try {


      await axios.post(
        API_URL,
        formData,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );


      await getUsers();


    } catch (error) {

      console.log(
        "Add User Error:",
        error.response?.data || error.message
      );

    }

  };




  return (

    <ListPageTemplate


      title="Users"

      subtitle="Manage system users and their access"


      addLabel="Add User"



      stats={[


        {
          title: "Total Users",
          value: users.length,
          icon: FiUsers,
          color: "brand"
        },


        {
          title: "Active",
          value: users.filter(
            user => Number(user.status) === 1
          ).length,

          icon: FiCheckCircle,
          color: "emerald"
        },


        {
          title: "Inactive",
          value: users.filter(
            user => Number(user.status) === 0
          ).length,

          icon: FiXCircle,
          color: "rose"
        }


      ]}



      columns={columns}


      data={users}



      filters={[
        {
          label: "Status",

          options: [

            {
              value: "",
              label: "All"
            },

            {
              value: 1,
              label: "Active"
            },

            {
              value: 0,
              label: "Inactive"
            }

          ]
        }
      ]}




      formFields={[


        {
          name: "role_id",
          label: "Role ID",
          type: "number"
        },


        {
          name: "name",
          label: "Name"
        },


        {
          name: "email",
          label: "Email",
          type: "email"
        },


        {
          name: "mobile",
          label: "Mobile"
        },


        {
          name: "password",
          label: "Password",
          type: "password"
        },


        {
          name: "status",

          label: "Status",

          type: "select",

          options: [

            {
              value: 1,
              label: "Active"
            },

            {
              value: 0,
              label: "Inactive"
            }

          ]

        }


      ]}




      onAdd={addUser}




      detailFields={[


        {
          key: "name",
          label: "Name"
        },


        {
          key: "email",
          label: "Email"
        },


        {
          key: "mobile",
          label: "Mobile"
        },


        {
          key: "role_id",
          label: "Role"
        },


        {
          key: "status",
          label: "Status"
        },


        {
          key: "created_at",
          label: "Created At"
        }


      ]}



    />

  );

}