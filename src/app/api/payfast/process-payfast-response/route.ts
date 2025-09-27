import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const secretword = "zWHjBp2AlttNu1sK";

    const {
      transaction_id,
      err_code,
      err_msg,
      basket_id,
      order_date,
      Response_Key,
      validation_hash,
      transaction_amount,
      merchant_amount,
      PaymentName,
      Recurring_txn,
      transaction_currency,
      email_address,
      mobile_no,
    } = body;

    // const response_string = `${transaction_id}${basket_id}${secretword}${transaction_amount}${err_code}`;
    // const response_hash = crypto
    //   .createHash("md5")
    //   .update(response_string)
    //   .digest("hex");

    // if (response_hash.toLowerCase() !== Response_Key?.toLowerCase()) {
    //   return NextResponse.json(
    //     { message: "Transaction could not be verified" },
    //     { status: 400 }
    //   );
    // }

    if (["000", "00"].includes(err_code)) {
      return NextResponse.json(
        {
          message: "Transaction Successfully Completed",
          transaction_id,
          basket_id,
          status: "success",
          date: order_date,
          transaction_amount,
          merchant_amount,
          payment_method: PaymentName,
          recurring: Recurring_txn === "True",
          currency: transaction_currency,
          email: email_address,
          mobile: mobile_no,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        message: "Transaction Failed",
        error: err_msg,
        status: "failed",
      },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}
