import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { loginSchema } from '../../utils/validators';
import { ROUTES } from '../../constants/routes';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

export default function Login() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || ROUTES.DASHBOARD;

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: '', password: '', remember: false },
  });

  const onSubmit = async (data) => {
    try {
      await login(data);
      toast.success('Welcome back!');
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="card p-8 w-full max-w-md">
      <h1 className="text-2xl font-bold mb-1">Fleet Admin</h1>
      <p className="text-muted mb-6">Sign in to your account</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Email" type="email" error={errors.email?.message} {...register('email')} />
        <Input label="Password" type="password" error={errors.password?.message} {...register('password')} />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" {...register('remember')} />
          Remember me
        </label>
        <Button type="submit" loading={loading} className="w-full">Sign In</Button>
      </form>
      <Link to={ROUTES.FORGOT_PASSWORD} className="text-sm text-primary-600 mt-4 inline-block">
        Forgot password?
      </Link>
      <p className="text-xs text-muted mt-6">Demo: admin@fleet.com / Admin@123</p>
    </motion.div>
  );
}