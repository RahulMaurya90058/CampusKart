import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import rahul from "../assets/rahul.png";
import { 
  FaReact, FaNodeJs, FaJsSquare, FaHtml5, FaCss3Alt, 
  FaCreditCard, FaDatabase, FaClock, FaCalculator, FaRocket,
  FaGithub, FaLinkedin, FaEnvelope
} from "react-icons/fa";
import { SiExpress, SiMongodb } from "react-icons/si";

function About() {
  return (
    // 'min-h-screen flex flex-col' सुनिश्चित करता है कि कंटेंट कम होने पर भी फूटर नीचे ही रहे
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100 relative overflow-x-hidden">
      
      {/* ================= 1. बैकग्राउंड एनिमेटेड लाइट्स और ग्रेडिएंट्स ================= */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 z-0" />
      
      {/* ग्लोइंग एनिमेशन ऑर्ब्स (Glowing Orbs) */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] animate-pulse delay-700 pointer-events-none" />

      {/* ================= 2. हेडर / नैवबार (z-50 ताकि ड्रॉपडाउन हमेशा सबसे ऊपर रहे) ================= */}
      <div className="relative z-50">
        <Navbar />
      </div>

      {/* ================= 3. मुख्य कंटेंट बॉक्स (z-10 ताकि यह नैवबार के नीचे रहे) ================= */}
      <main className="flex-grow z-10 py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full relative">
        
        {/* ग्लास-मॉर्फिज्म मेन कंटेनर */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-[2.5rem] border border-slate-700/50 shadow-2xl p-6 sm:p-10 md:p-12 transition-all duration-300">
          
          {/* पेज हेडिंग */}
          <div className="text-center mb-12 sm:mb-16">
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent text-xs sm:text-sm font-black uppercase tracking-widest px-4 py-1.5 rounded-full bg-slate-700/30 border border-slate-600/30">
              Developer Profile
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mt-3 bg-gradient-to-r from-white via-slate-200 to-blue-400 bg-clip-text text-transparent tracking-tight">
              About The Creator
            </h1>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">

            {/* लेफ्ट साइड: इमेज और सोशल लिंक्स */}
            <div className="lg:col-span-5 flex flex-col items-center gap-6 sticky top-24">
              <div className="relative group w-64 sm:w-72 md:w-80 aspect-[4/5]">
                {/* एनिमेटेड बॉर्डर आभामंडल (Halo Effect) */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 via-purple-500 to-indigo-500 rounded-[2rem] opacity-70 blur-md group-hover:opacity-100 group-hover:blur-xl transition-all duration-500 scale-102" />
                
                {/* डेवलपर इमेज */}
                <div className="absolute inset-0 rounded-[2rem] overflow-hidden border-2 border-slate-600/50 bg-slate-900 shadow-2xl">
                  <img
                    src={rahul}
                    alt="Rahul Maurya"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* त्वरित सोशल मीडिया लिंक्स (Fixed Code Here) */}
              <div className="flex items-center gap-4 mt-2">
                <a href="https://github.com" target="_blank" rel="noreferrer" className="p-3 bg-slate-700/50 hover:bg-blue-600 rounded-xl transition text-lg text-slate-300 hover:text-white border border-slate-600/50 shadow-md">
                  <FaGithub />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-3 bg-slate-700/50 hover:bg-blue-600 rounded-xl transition text-lg text-slate-300 hover:text-white border border-slate-600/50 shadow-md">
                  <FaLinkedin />
                </a>
                <a href="mailto:rahulmaurya956945@gmail.com" className="p-3 bg-slate-700/50 hover:bg-blue-600 rounded-xl transition text-lg text-slate-300 hover:text-white border border-slate-600/50 shadow-md">
                  <FaEnvelope />
                </a>
              </div>
            </div>

            {/* राइट साइड: विवरण, स्किल्स और प्रोजेक्ट्स */}
            <div className="lg:col-span-7 space-y-10 text-center lg:text-left">
              
              {/* बायो (Bio Description) */}
              <div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Rahul Maurya
                </h2>
                <p className="text-lg font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mt-1.5">
                  Full Stack MERN Developer
                </p>
                <div className="mt-5 text-slate-300 leading-relaxed space-y-4 text-sm sm:text-base">
                  <p>
                    Hello! I'm <span className="font-bold text-blue-400">Rahul Maurya</span>,
                    a B.Tech Information Technology graduate with a strong drive for Full Stack Web
                    Development. I specialize in engineering responsive, reliable, and secure ecosystem architectures using the MERN Stack.
                  </p>
                  <p>
                    <span className="font-bold text-white">CampusKart</span> is my flagship deployment—crafted to establish a streamlined marketplace ecosystem for college student networks. It scales fluidly across viewports and packs features like token authentication, transactional integrations, and live operational consoles.
                  </p>
                </div>
              </div>

              {/* तकनीकी स्किल्स (Skills Section) */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center justify-center lg:justify-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span> Technical Stack
                </h3>
                <div className="flex flex-wrap gap-2.5 justify-center lg:justify-start">
                  <span className="flex items-center gap-1.5 bg-orange-500/10 text-orange-400 border border-orange-500/20 px-3.5 py-1.5 rounded-xl text-xs font-extrabold tracking-wide"><FaHtml5 /> HTML5</span>
                  <span className="flex items-center gap-1.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3.5 py-1.5 rounded-xl text-xs font-extrabold tracking-wide"><FaCss3Alt /> CSS3</span>
                  <span className="flex items-center gap-1.5 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 px-3.5 py-1.5 rounded-xl text-xs font-extrabold tracking-wide"><FaJsSquare /> JavaScript</span>
                  <span className="flex items-center gap-1.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-3.5 py-1.5 rounded-xl text-xs font-extrabold tracking-wide"><FaReact /> React</span>
                  <span className="flex items-center gap-1.5 bg-green-500/10 text-green-400 border border-green-500/20 px-3.5 py-1.5 rounded-xl text-xs font-extrabold tracking-wide"><FaNodeJs /> Node.js</span>
                  <span className="flex items-center gap-1.5 bg-slate-400/10 text-slate-300 border border-slate-400/20 px-3.5 py-1.5 rounded-xl text-xs font-extrabold tracking-wide"><SiExpress /> Express.js</span>
                  <span className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-200/20 px-3.5 py-1.5 rounded-xl text-xs font-extrabold tracking-wide"><SiMongodb /> MongoDB</span>
                  <span className="flex items-center gap-1.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3.5 py-1.5 rounded-xl text-xs font-extrabold tracking-wide"><FaCreditCard /> Razorpay</span>
                </div>
              </div>

              {/* फीचर्ड प्रोजेक्ट्स */}
              <div className="pt-2">
                <h3 className="text-xl font-bold text-white mb-5 flex items-center justify-center lg:justify-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span> Featured Projects
                </h3>
                
                <div className="grid sm:grid-cols-1 gap-4">
                  
                  {/* प्रोजेक्ट 1: CampusKart */}
                  <div className="bg-gradient-to-r from-slate-800/80 to-slate-800/40 p-5 rounded-2xl border border-slate-700/60 shadow-md group hover:border-blue-500/50 transition-all duration-300 text-left">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-black text-lg text-blue-400 group-hover:text-blue-300 transition flex items-center gap-2">
                        <FaRocket className="text-sm" /> CampusKart
                      </h4>
                      <span className="text-[10px] bg-blue-500/20 text-blue-400 font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">Flagship</span>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      A complete MERN marketplace with authentication, Razorpay payment gateway, 
                      wishlist, order management, seller dashboard, and fluid responsive UI layout.
                    </p>
                  </div>

                  {/* प्रोजेक्ट 2: Stopwatch */}
                  <div className="bg-gradient-to-r from-slate-800/80 to-slate-800/40 p-5 rounded-2xl border border-slate-700/60 shadow-md group hover:border-emerald-500/50 transition-all duration-300 text-left">
                    <h4 className="font-black text-lg text-emerald-400 group-hover:text-emerald-300 transition flex items-center gap-2 mb-2">
                      <FaClock className="text-sm" /> Stopwatch
                    </h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      High-accuracy standalone responsive web utility engineered with core HTML, CSS, and 
                      JavaScript logic, featuring precise real-time splits and saved lap operations.
                    </p>
                  </div>

                  {/* प्रोजेक्ट 3: Calculator */}
                  <div className="bg-gradient-to-r from-slate-800/80 to-slate-800/40 p-5 rounded-2xl border border-slate-700/60 shadow-md group hover:border-amber-500/50 transition-all duration-300 text-left">
                    <h4 className="font-black text-lg text-amber-400 group-hover:text-amber-300 transition flex items-center gap-2 mb-2">
                      <FaCalculator className="text-sm" /> Calculator
                    </h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      A sleek mathematical terminal built to resolve clean computational executions natively 
                      across modern mobile viewports and desktop web client views.
                    </p>
                  </div>

                </div>
              </div>

            </div>

          </div>

        </div>

      </main>

      {/* ================= 4. फूटर (Footer) ================= */}
      <footer className="relative z-10 mt-auto border-t border-slate-800/60">
        <Footer />
      </footer>
      
    </div>
  );
}

export default About;