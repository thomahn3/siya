import requireAuth from '../../middleware';
import jwt from 'jsonwebtoken';

export async function getServerSideProps(context) {
    const token = context.req.cookies.token;
    if (!token) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
    try {
      jwt.verify(token, process.env.SECRET_KEY);
      return { props: {} };
    } catch (err) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
  }

export default function Home() {
  return (
    <main>
      {/*const handleLogout = () => {
  localStorage.removeItem('token');
  // Redirect user to login page
}; (LOGOUT BUTTON*/}
      <p>admin console</p>
    </main>
  );
}