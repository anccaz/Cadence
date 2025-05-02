# Cadence

## 🎵 Description

**Cadence** puts an end to your musical struggles at UT Dallas!  
Whether you’re a solo musician searching for bandmates or a group looking to complete your lineup, Cadence helps you find other students based on instrument, music genre, and musical interests.  
Our mission: make it easy for you to connect, collaborate, and create music with like-minded peers.

---

## 🚀 Features

- **Find musicians** by instrument, genre, and musical interests
- **Create or join bands** and musical projects
- **Smart search and matching** to build your perfect ensemble
- **For UT Dallas students** – connect with your campus music community

---

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
    ```
    git clone https://github.com/your-username/cadence.git
    cd cadence
    ```

2. **Install dependencies:**
    ```
    npm install
    # or
    yarn install
    ```

3. **Set up your environment variables:**

    Create a `.env.local` file in the root directory and add the following:

    ```
    # Clerk
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_ZXZvbHZpbmctc3VuZmlzaC05Ny5jbGVyay5hY2NvdW50cy5kZXYk
    CLERK_SECRET_KEY=********

    # Azure SQL credentials
    AZURE_SQL_USER=sysAdmin
    AZURE_SQL_PASSWORD=p4ss-w0rd
    AZURE_SQL_SERVER=cadencedatabases.database.windows.net

    # Database names
    AZURE_SQL_DATABASE_USERS=Users
    AZURE_SQL_DATABASE_LISTINGS=Listings
    ```

4. **Run the project:**
    ```
    npm run dev
    # or
    yarn dev
    ```

    The app should now be running at [http://localhost:3000](http://localhost:3000).

---

## 💡 Usage

1. **Sign up** or log in with your UT Dallas email
2. **Set up your profile** (choose your instrument, genres, and interests)
3. **Browse or search** for other musicians and bands
4. **Send invites or join groups** to start making music together!

---

## 📄 License

[MIT](LICENSE)
