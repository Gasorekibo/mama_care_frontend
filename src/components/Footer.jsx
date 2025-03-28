import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { CiFacebook, CiInstagram, CiLinkedin, CiTwitter } from "react-icons/ci";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">MamaCare</h3>
            <p className="mb-4 text-sm">
              Providing quality healthcare services with compassion and
              excellence. Your health is our priority.
            </p>
            <div className="flex space-x-4">
              <Link to={'/'} className="hover:text-blue-400 transition-colors">
                <CiFacebook size={20} />
              </Link>
              <Link to={"/"} className="hover:text-blue-400 transition-colors">
                <CiTwitter size={20} />
              </Link>
              <Link to={'/'} className="hover:text-blue-400 transition-colors">
                <CiLinkedin size={20} />
              </Link>
              <Link to={'/'} className="hover:text-blue-400 transition-colors">
                <CiInstagram size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
            <ul className=" flex flex-col space-y-2">
              <Link to={"/"} className="hover:text-blue-400 transition-colors">
                About Us
              </Link>
              <Link to={"/"} className="hover:text-blue-400 transition-colors">
                Our Services
              </Link>
              <Link to={"/"} className="hover:text-blue-400 transition-colors">
                Find a Doctor
              </Link>
              <Link to={"/"} className="hover:text-blue-400 transition-colors">
                Book Appointment
              </Link>
              <Link to={"/"} className="hover:text-blue-400 transition-colors">
                Latest News
              </Link>
              <Link to={"/"} className="hover:text-blue-400 transition-colors">
                Career Opportunities
              </Link>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <Link className="flex items-center">
                <Phone size={16} className="mr-2" />
                <span>Emergency: +250 78792967</span>
              </Link>
              <Link className="flex items-center">
                <Mail size={16} className="mr-2" />
                <span>mamacare.health@gmail.com</span>
              </Link>
              <Link className="flex items-center">
                <MapPin size={16} className="mr-2" />
                <span>123 Healthcare Ave, Medical City</span>
              </Link>
              <Link className="flex items-center">
                <Clock size={16} className="mr-2" />
                <span>24/7 Emergency Services</span>
              </Link>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-bold mb-4">Newsletter</h3>
            <p className="mb-4 text-sm">
              Subscribe to our newsletter for health tips and updates.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm">
              © {currentYear} MamaCare. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link
                to={"/privacy-policy"}
                className="hover:text-blue-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to={"/terms-of-service"}
                className="hover:text-blue-400 transition-colors"
              >
                Terms of Service
              </Link>
              <a href="#" className="hover:text-blue-400 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
