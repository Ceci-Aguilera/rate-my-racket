import axios from "axios";
import { createContext } from "react";
import { useEffect, useState, useContext } from "react";

import { useRouter } from "next/router"

const AuthContext = createContext();


const domain = process.env.NEXT_PUBLIC_BACKEND_API_URL


export const getUser = async () => {

  const user_token = window.localStorage.getItem("user_token");

  const auth_url =  `${domain}/accounts-app/check-auth/`;

  if (user_token !== "undefined") {

    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${user_token}`,
      },
    };


    return await axios
      .get(auth_url, config)
      .then(async (response) => {
        if (response.data) {
          
          const res = await response.data;
          if(res.username != "")
          {
            return { status: "SIGNED_IN", user: res};
          }
          else {
            return { status: "SIGNED_OUT", user: null};
          }
        } else {
          return { status: "SIGNED_OUT", user: null};
        }
      })
      .catch((err) => {
        return { status: "SIGNED_OUT", user: null};
      });
  } else {
    return { status: "SIGNED_OUT", user: null};
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);


    const router = useRouter();

    useEffect(() => {

      async function fetchUser(){
          const temp_auth = await getUser();
          setUser(temp_auth["user"]);
      }
    fetchUser(token);
    }, []);


  useEffect(() => {

    async function fetchUser(){
        const temp_auth = await getUser();
        setUser(temp_auth["user"]);
    }
if(token != null && token != undefined){
  fetchUser(token);
}
  }, [token]);

  const login = async (body) => {

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const login_url = `${domain}/accounts-app/login/`;

    return await axios
      .post(login_url, body, config)
      .then(async (response) => {
        const res = await response.data;
        const access_token = res["Result"];
        window.localStorage.setItem("user_token", access_token);
        setToken(access_token);
        return "Success"
      })
      .catch((error) => {
        return "Error"
      });
  };

  
  const register = async (body) => {

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const register_url = `${domain}/accounts-app/register/`;

    return await axios
      .post(register_url, body, config)
      .then(async (response) => {
        const res = await response.data;
        return res['Result']
      })
      .catch((error) => {
        return "Error"
      });
  };

  const update_userprofile = async (userprofile_id, body) => {

    const user_token = window.localStorage.getItem("user_token");
  
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
    const update_userprofile_url = `${domain}/accounts-app/update/${userprofile_id}/`;

    return await axios
      .put(update_userprofile_url, body, config)
      .then(async (response) => {
        const res = await response.data;
        return res;
      })
      .catch((error) => {
        return "Error"
      });
  };






  const logout = async () => {
    window.localStorage.removeItem("user_token");
      setUser(null);
  };


  return (
    <AuthContext.Provider value={{ user, token, logout, login, register, update_userprofile}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export const AuthConsumer = AuthContext.Consumer;