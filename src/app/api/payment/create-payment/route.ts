import {NextResponse} from 'next/server'
import Razorpay from 'razorpay';

const RAZORPAY_KEY_ID = `${process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID}`;
const RAZORPAY_KEY = `${process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET}`

const razorpay = new Razorpay({
    key_id: RAZORPAY_KEY_ID,
    key_secret: RAZORPAY_KEY,
});

export async function POST(req : Request){
    const body = await req.json();
    try {
        const options = {
            amount: 299900, 
            currency: 'INR',
            receipt: 'receipt_' + Math.random().toString(36).substring(7), //Unique and random receipt ID
            notes : {
                name : body.name,
                emailId : body.emailId
            }
        };

        const order = await razorpay.orders.create(options);
        return NextResponse.json(order,{status : 200});
    } catch (err : unknown) {
        console.log("error while making payment",err);
        return NextResponse.json("Internal Network error occurred.",{status : 500});
    }
}