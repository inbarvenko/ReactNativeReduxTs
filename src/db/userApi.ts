import { SignInData, SignUpData } from "../../types";
import { supabase } from "./initSupabase";

export const getUser = async (userData: SignInData) => {

    let {data, error} = await supabase
      .from('users')
      .select('email, password')
      .eq('email', userData.email)
      .eq('password', userData.password)
  
    if(!data) {return ;}
    if(!data[0]) {return ;}
    console.log('data[0]: ', data[0])
    
    if (error) {console.log(error?.message);}
    else {return {todo: data[0] }}
};

export const newUser = async (userData: SignUpData) => {

  let {error} = await supabase
    .from('users')
    .insert([{'email': userData.email, 'password': userData.password}]);
  
  if (error) {console.log(error?.message);}
  else {return true;}
};