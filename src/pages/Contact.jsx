import React, { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";

const Contact = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 pt-30">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <form className="bg-white rounded-lg shadow-md p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006850] focus:border-transparent outline-none"
                                        placeholder="Nama Anda..."
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006850] focus:border-transparent outline-none"
                                        placeholder="your.email@example.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006850] focus:border-transparent outline-none"
                                    placeholder="+62 xxx xxx xxx"
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    rows="6"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006850] focus:border-transparent outline-none resize-none"
                                    placeholder="Pesan Anda..."
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full md:w-auto px-8 py-3 bg-[#006850] text-white font-medium rounded-lg transition duration-200"
                            >
                                Kirim Pesan
                            </button>
                        </form>
                    </div>

                    {/* Newsletter Section */}
                    <div className="lg:col-span-1">
                        <div className="bg-gradient-to-br from-[#006850] to-[#004a3a] rounded-lg shadow-md p-8 text-white">
                            <h2 className="text-2xl font-bold mb-4">
                                Subscribe to Our Newsletter
                            </h2>
                            <p className="text-green-100 mb-6">
                                Dapatkan tips perawatan tanaman, update produk terbaru, dan
                                penawaran spesial langsung ke email Anda!
                            </p>
                            <form>
                                <input
                                    type="email"
                                    className="w-full px-4 py-3 rounded-lg mb-4 text-gray-900 outline-border bg-white"
                                    placeholder="Your email"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="w-full px-6 py-3 bg-[#1B1B1B] text-white font-medium rounded-lg transition duration-200"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Map Section */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.3049584320384!2d107.59067007499654!3d-6.866502093158258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e6be3e8a0c49%3A0x730028bf4627def4!2sUniversitas%20Pasundan!5e0!3m2!1sen!2sid!4v1234567890123!5m2!1sen!2sid"
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Location Map"
                    />
                </div>
            </div>
        </div>
    );
};

export default Contact;
