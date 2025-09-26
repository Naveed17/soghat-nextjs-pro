"use server";
import { createSession, logout } from "@lib/session";
const base_url = process.env.NEXT_PUBLIC_API_URL;
export const fetchWebsiteContent = async () => {
  try {
    const response = await fetch(`${base_url}/website/home_front`, {
      next: { revalidate: 60 },
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        start: 0,
        end: 50,
        location_id: 247,
        user_id: 116,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data website content");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const fetchProductList = async ({
  slug,
  type,
  page,
}: {
  slug: string;
  type: string;
  page: string;
}) => {
  try {
    const response = await fetch(
      `${base_url}/website/categoryfind?cf=${slug}&type=${type}&page=${page}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data product list");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const fetchFindBrands = async (name: string, page: string) => {
  try {
    const response = await fetch(
      `${base_url}/website/brand_find?name=${name}&per_page=15&page=${page}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data find brands");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const fetchBrandsList = async () => {
  try {
    const response = await fetch(`${base_url}/website/brands_list`);

    if (!response.ok) {
      throw new Error("Failed to fetch data brand list");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const fetchProductDetails = async (id: string) => {
  try {
    const response = await fetch(`${base_url}/website/findproduct?id=${id}`, {
      cache: "no-cache",
    });

    // if (!response.ok) {
    //   throw new Error("Failed to fetch data product details");
    // }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const orderComplete = async (payload: any) => {
  console.log(payload);
  try {
    const response = await fetch(`${base_url}/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data order complete");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const createUser = async (formData: FormData) => {
  const email = formData.get("reg_email");
  const password = formData.get("password");
  const reg_fn = formData.get("reg_fn");
  const reg_ln = formData.get("reg_ln");
  const phone = formData.get("reg_phone");
  const body = {
    email,
    password,
    reg_fn,
    reg_ln,
    phone,
  };
  try {
    const response = await fetch(`${base_url}/website/create_new_signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data create user");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const userLogin = async (formData: FormData) => {
  const login_email = formData.get("login_email");
  const login_password = formData.get("login_password");
  const body = {
    login_email,
    login_password,
  };

  try {
    const response = await fetch(`${base_url}/website/login_user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch data user login");
    }
    const data = await response.json();
    if (data.Boolean) {
      const { user } = data;
      await createSession(user);
    }
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const logOut = async () => {
  await logout();
};
export const updateProfile = async (formData: FormData) => {
  const name = formData.get("name");
  const email = formData.get("email");
  const user_id = formData.get("user_id");
  const phone = formData.get("phone");
  const city = formData.get("city");
  const address = formData.get("address");
  const body = {
    user_id,
    name,
    email,
    city,
    address,
    phone,
  };

  try {
    const response = await fetch(`${base_url}/website/submitProfileUpdate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data update profile");
    }

    const data = await response.json();
    if (data.Boolean) {
      const { user } = data;
      await createSession(user);
    }
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const trackingOrder = async (id: any) => {
  try {
    const response = await fetch(`${base_url}/website/OrderTracking_order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_id: id,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data tracking order");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const forgetPassword = async (formData: FormData) => {
  const email = formData.get("email");
  const newpassword = formData.get("newpassword");
  const confirmed = formData.get("confirmed");
  const body = {
    email,
    newpassword,
    confirmed,
  };
  try {
    const response = await fetch(
      `${base_url}/website/website_update_password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data forget password");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const fetchSearch = async (payload: any, page: string) => {
  try {
    const response = await fetch(
      `${base_url}/website/serach_new?page=${page}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...payload,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch Search Data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const fetchAllProducts = async () => {
  try {
    const response = await fetch(`${base_url}/product/all_product`, {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch All Product Data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
// Pay Fast Apis
export const getToken = async (formData: FormData) => {
  const body = {
    amount: formData.get("amount") || "",
    order_id: formData.get("order_id") || "",
    user_id: formData.get("user_id") || "",
  };

  try {
    const response = await fetch(`${base_url}/payfast/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    // Parse the JSON response once
    const responseData = await response.json();

    // Check for errors in the response
    if (!response.ok || responseData.status === "error") {
      return responseData; // Return the error details
    }

    // Return the success response
    return responseData;
  } catch (error) {
    console.error("Error fetching token:", error);
    throw error; // Re-throw for upstream handling
  }
};

export const customerValidate = async (payload: any) => {
  try {
    const response = await fetch(`${base_url}/payfast/customer/validate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const responseData = await response.json();
    if (!response.ok || responseData.status === "error") {
      return responseData; // Return the error details
    }

    return responseData;
  } catch (error) {
    console.error("Error:", error);
  }
};
export const transaction = async (payload: any) => {
  try {
    const response = await fetch(`${base_url}/payfast/transaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const responseData = await response.json(); // Parse the response once
    if (!response.ok || responseData.status === "error") {
      return responseData; // Return the error details
    }
    return responseData;
  } catch (error) {
    console.error("Error:", error);
  }
};
export const getBanksList = async (payload: any) => {
  try {
    const response = await fetch(`${base_url}/payfast/payfast_list_banks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const responseData = await response.json(); // Parse the response once
    if (!response.ok || responseData.status === "error") {
      return responseData; // Return the error details
    }
    return responseData;
  } catch (error) {
    console.error("Error:", error);
  }
};
export const wishList = async (payload: any) => {
  try {
    const response = await fetch(`${base_url}/wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data wish list");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const customerValidateWallet = async (payload: any) => {
  try {
    const response = await fetch(
      `${base_url}/payfast/validateCustomer_walletPayment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const responseData = await response.json();
    if (!response.ok || responseData.status === "error") {
      return responseData; // Return the error details
    }

    return responseData;
  } catch (error) {
    console.error("Error:", error);
  }
};
export const walletPayment = async (payload: any) => {
  try {
    const response = await fetch(
      `${base_url}/payfast/initiatePayment_walletPayment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const responseData = await response.json(); // Parse the response once
    if (!response.ok || responseData.status === "error") {
      return responseData; // Return the error details
    }
    return responseData;
  } catch (error) {
    console.error("Error:", error);
  }
};
export const fetchSellerDetails = async (id: string) => {
  try {
    const response = await fetch(`${base_url}/website/seller_info_store`, {
      next: {
        revalidate: 60,
      },
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        seller_id: id,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data seller details");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
