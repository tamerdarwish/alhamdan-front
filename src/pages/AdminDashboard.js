import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { FaCalendarAlt, FaBox, FaShoppingCart, FaPrint, FaHome } from 'react-icons/fa';
import { checkAdminAuth } from '../utils/adminAuth';
import './AdminDashboard.css'; // تأكد من استيراد ملف CSS المحسن

const AdminDashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const isAdminAuthenticated = checkAdminAuth();
        if (!isAdminAuthenticated) {
            navigate('/admin/login');
        }
    }, [navigate]);

    return (
        <Container className="mt-5">
            <h1 className="text-center mb-4">لوحة تحكم الأدمن</h1>
            <Row>
                <Col md={4} className="mb-4">
                    <Card as={Link} to="/admin/events" className="text-center h-100 dashboard-card">
                        <Card.Body>
                            <FaCalendarAlt size={50} className="mb-3" />
                            <Card.Title>إدارة قائمة المناسبات</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="mb-4">
                    <Card as={Link} to="/admin/products" className="text-center h-100 dashboard-card">
                        <Card.Body>
                            <FaBox size={50} className="mb-3" />
                            <Card.Title>إدارة منتجات المتجر</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="mb-4">
                    <Card as={Link} to="/admin/orders" className="text-center h-100 dashboard-card">
                        <Card.Body>
                            <FaShoppingCart size={50} className="mb-3" />
                            <Card.Title>إدارة الطلبات</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="mb-4">
                    <Card as={Link} to="/admin-printalbums" className="text-center h-100 dashboard-card">
                        <Card.Body>
                            <FaPrint size={50} className="mb-3" />
                            <Card.Title>إدارة الطباعات</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="mb-4">
                    <Card as={Link} to="/" className="text-center h-100 dashboard-card">
                        <Card.Body>
                            <FaHome size={50} className="mb-3" />
                            <Card.Title>الانتقال للموقع</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AdminDashboard;
