import { supabase } from "../services/supabaseClient";

const users = [
  {
    email: "admin@unitinghomes.com",
    password: "Admin@123",
    role: "admin",
  },
  {
    email: "staff1@unitinghomes.com",
    password: "Staff@123",
    role: "staff",
  },
  {
    email: "resident1@unitinghomes.com",
    password: "User@123",
    role: "resident",
  },
  {
    email: "resident2@unitinghomes.com",
    password: "User@123",
    role: "resident",
  },
  {
    email: "resident3@unitinghomes.com",
    password: "User@123",
    role: "resident",
  },
];

async function createUsers() {
  for (const u of users) {
    const { error } = await supabase.auth.signUp({
      email: u.email,
      password: u.password,
    });

    if (error) {
      console.error(`Error creating ${u.email}:`, error.message);
    } else {
      console.log(`Created user: ${u.email}`);
    }
  }
}

createUsers();