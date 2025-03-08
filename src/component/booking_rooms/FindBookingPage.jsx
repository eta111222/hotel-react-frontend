import React, { useState } from 'react';
import ApiService from '../../service/ApiService'; 

const FindBookingPage = () => {
    const [confirmationCode, setConfirmationCode] = useState(''); 
    const [bookingDetails, setBookingDetails] = useState(null); 
    const [error, setError] = useState(null); 

    const handleSearch = async () => {
        if (!confirmationCode.trim()) {
            setError("Please Enter a booking confirmation code");
            setTimeout(() => setError(''), 5000);
            return;
        }
        try {
            const response = await ApiService.getBookingByReference(confirmationCode);
            setBookingDetails(response.booking);
            setError(null); 
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setTimeout(() => setError(''), 5000);
        }
    };

    return (
        <div className="find-booking-page">
            <h2>Find Booking</h2>
            <div className="search-container">
                <input
                    required
                    type="text"
                    placeholder="Enter your booking confirmation code"
                    value={confirmationCode}
                    onChange={(e) => setConfirmationCode(e.target.value)}
                />
                <button onClick={handleSearch}>Find</button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {bookingDetails && (
                <div className="booking-details">
                    <h3>Booking Details</h3>
                    <p>Booking Code: {bookingDetails.bookingReference}</p>
                    <p>Check-in Date: {bookingDetails.checkInDate}</p>
                    <p>Check-out Date: {bookingDetails.checkOutDate}</p>
                    <p>Payment Status: {bookingDetails.paymentStatus}</p>
                    <p>Amount: {bookingDetails.totalPrice}</p>
                    <p>Booking Status: {bookingDetails.bookingStatus}</p>

                    <br />
                    <hr />
                    <br />
                    <h3>Booker Detials</h3>
                    <div>
                        <p> First Name: {bookingDetails.user.firstName}</p>
                        <p> Last Name: {bookingDetails.user.lastName}</p>
                        <p> Email: {bookingDetails.user.email}</p>
                        <p> Phone Number: {bookingDetails.user.phoneNumber}</p>
                    </div>

                    <br />
                    <hr />
                    <br />
                    <h3>Room Details</h3>
                    <div>
                        <p> Room Number: {bookingDetails.room.roomNumber}</p>
                        <p> Room Type: {bookingDetails.room.type}</p>
                        <p> Room Capacity: {bookingDetails.room.capacity}</p>
                        <img src={bookingDetails.room.imageUrl} alt="" sizes="" srcSet="" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default FindBookingPage;
