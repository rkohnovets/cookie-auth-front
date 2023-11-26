import { useAuth } from "../../Auth/AuthContext";
import { api_https } from "../../utils/constants";

export function AuthStatus() {
  let auth = useAuth();

  const handleCheckAuth = async () => {
      try {
          let response = await fetch(api_https + '/WeatherForecast/check_auth', {
              method: 'GET',
              credentials: 'include',
              mode: 'cors'
          });
          
          if(response.ok) {
              let text = await response.text();
              alert("Status: OK, message: " + text);
          } else {
              if(response.status === 401)
                alert("Code " + response.status + "- you are not authenticated");
              else {
                let text = await response.text();
                alert("Code " + response.status + ", message: " + text);
              }
          }
      } catch(ex) {
          alert(ex);
      }
  };

  return (
    <>
      <div className="font-bold text-lg tracking-tight inline-flex items-center
        bg-indigo-100 rounded px-2 py-1 text-black">
        {auth.user ? 
          <p> Welcome {auth.user!.Username}! </p>
          : <p> You are not logged in. </p>}
        <div className="font-bold text-base tracking-tight inline-block
          bg-gray-500 ml-2 hover:bg-gray-600 active:bg-gray-700 rounded px-2 py-1"
          onClick={handleCheckAuth}>
          Check
        </div>
      </div>
      
    </>
  )
}