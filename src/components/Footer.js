import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import XIcon from "@mui/icons-material/X";
import { Container } from "@mui/material";

export default function Footer() {
  return (
    <div>
      <div className="py-[30px] relative z-10 offers rounded-[30px] bg-black p-5 flex justify-center w-[80%] flex-col md:justify-between md:flex-row items-center px-[40px] gap-3 mx-auto mb-[-75px] ">
        <h3 className="text-[30px] text-white text-center md:text-left font-bold max-w-[400px]">
          STAY UPTO DATE ABOUT OUR LATEST OFFERS
        </h3>
        <div>
          <div className="flex items-center gap-x-2 relative mb-4">
            <input
              className="bg-white rounded-[64px] pl-[35px] w-[300px] py-[10px]"
              placeholder="Your Email"
              type="email"
            />
            <span className="block absolute left-1">
              <EmailOutlinedIcon sx={{ color: "black" }} />
            </span>
          </div>
          <button className="px-[50px] py-[10px] w-[300px] bg-white rounded-[64px]">
            Subscribe to Newsletter
          </button>
        </div>
      </div>
      <div className="footer bg-[#F0F0F0]  ">
        {/* Offers Section */}

        {/* Footer Grid Content */}
        <Container className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] text-left gap-[35px] py-[150px]">
          <div className=" footer-spans flex flex-col gap-y-[20px]">
            <h3 className="logo text-[33px] font-[archivo] font-extrabold">
              SHOP.CO
            </h3>
            <p className="text-black/60">
              We have clothes that suits your style and which you’re proud to
              wear. From women to men.
            </p>
            <div className="icons flex gap-x-[15px]">
              <a>
                <FacebookIcon />
              </a>
              <a>
                <InstagramIcon />
              </a>
              <a>
                <XIcon />
              </a>
              <a>
                <GitHubIcon />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-y-[20px]">
            <h3 className="logo text-[22px]">Company</h3>
            <div className="titles flex flex-col gap-y-[10px]">
              <a>
                <span className="text-black/60">About</span>
              </a>
              <a>
                <span className="text-black/60">Features</span>
              </a>
              <a>
                <span className="text-black/60">Works</span>
              </a>
              <a>
                <span className="text-black/60">Career</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-y-[20px]">
            <h3 className="logo text-[22px]">Help</h3>
            <div className="titles flex flex-col gap-y-[10px]">
              <a>
                <span className="text-black/60">Customer Support</span>
              </a>
              <a>
                <span className="text-black/60">Delivery Details</span>
              </a>
              <a>
                <span className="text-black/60">Terms & Conditions</span>
              </a>
              <a>
                <span className="text-black/60">Privacy Policy</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-y-[20px]">
            <h3 className="logo text-[22px]">Account</h3>
            <div className="titles flex flex-col gap-y-[10px]">
              <a>
                <span className="text-black/60">Account</span>
              </a>
              <a>
                <span className="text-black/60">Manage Deliveries</span>
              </a>
              <a>
                <span className="text-black/60">Orders</span>
              </a>
              <a>
                <span className="text-black/60">Payments</span>
              </a>
            </div>
          </div>
        </Container>
        <h1 className="text-[30px]">Created By TaimJr</h1>
      </div>
    </div>
  );
}
