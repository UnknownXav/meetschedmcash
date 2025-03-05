
import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { LoginResponse } from '../dto/User.dto';

const secretKey = 'secret';
const key = new TextEncoder().encode(secretKey)

export const encrypt = async(payload:any)=>{
    return await new SignJWT(payload).setProtectedHeader({alg:'HS256'}).setIssuedAt().setExpirationTime('7d').sign(key)
}

export const decrypt = async(input:string)=>{
    const {payload} = await jwtVerify(input,key,{
        algorithms:['HS256']
    })

    return payload
}

export const loginAuth = async(payload:LoginResponse)=>{
    const user = payload
    
    const expires = new Date(Date.now() + 20000 * 1000); 

    const session = await encrypt({user,expires})
    console.log("SESSIon",session)
    return session;
}

export async function logout() {
    // Destroy the session
    cookies().set("session", "", { expires: new Date(0), maxAge: 0 });
  }
  
export const updateSession = async(request:NextRequest)=>{
    const session = request.cookies.get('session')?.value;
   
    if (!session) {
    
        return NextResponse.rewrite(new URL('/login', request.url))
    }
    const res = NextResponse.next()
    try {
        const parsed = await decrypt(session);
        parsed.expires = new Date(Date.now() + 20000 * 1000)
    
       
        res.cookies.set({
            name:'session',
            value:await encrypt(parsed),
            httpOnly:true,
            expires:parsed.exp,
            maxAge:86400
        })
    
             
    } catch (error:any) {
        // res.cookies.set({
        //     name:'session',
        //     value:'',
        //     httpOnly:true,
        //     expires:new Date(0),
        //     maxAge:0
        // })
      
        //   const url = request.nextUrl.clone()
        //     url.pathname = '/'
        // return NextResponse.rewrite(url);
    }
    
    return res;
}



export const getSession = async():Promise<LoginResponse | null>=>{
    const session = cookies().get('session')?.value;
    if(!session) return null;
   // console.log("WEW",session)
    const dcrp = await decrypt(session)
   
    return dcrp?.user as LoginResponse;
}