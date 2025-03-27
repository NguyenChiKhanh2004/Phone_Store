import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import ModalNotification from "../components/NotificationComponent";
import { useState } from "react";
import { useLocation } from "react-router-dom";

function ProtectedLink({ to, children }) {
    const { isAuthenticated } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const location = useLocation();
    const shouldShowModal = !isAuthenticated
        && location.pathname !== "/login"
        && location.pathname !== "/register";
    const handleClick = (e) => {
        if (!isAuthenticated && shouldShowModal) {
            e.preventDefault();
            setShowModal(true);
        }
    };
    return (
        <>
            <Link to={to} onClick={handleClick}>
                {children}
            </Link>

            {shouldShowModal && showModal && (
                <ModalNotification
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                />
            )}
        </>
    );
}

export default ProtectedLink;
