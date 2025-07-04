import { useRouter } from 'vue-router';

export function useAuth() {
    const router = useRouter();
    const logout = () => {
        localStorage.removeItem('user-token');
        router.replace('/');

        console.log("Người dùng đã đăng xuất.");
    };

    return {
        logout,
    };
}