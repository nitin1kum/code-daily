import {NextResponse} from 'next/server'
import crypto from 'crypto'

const RAZORPAY_KEY_SECRET = `${process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET}`;

export async function POST(req : Request){
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

        const sign = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSign = crypto.createHmac('sha256', RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest('hex');

        if (razorpay_signature === expectedSign) {
            return NextResponse.json({message : "Payment verfied successfully"},{status : 200});
        } else {
            return NextResponse.json({message : "Invalid payment signature"},{status : 400});
        }
    } catch (err) {
        console.log("error occurred while verfying payment - ",err);
        return NextResponse.json({message : "Internal network error"},{status : 500});
    }
}