'use client';

import { useEffect, useState } from 'react';
import { parsePhoneNumberWithError, ParseError } from 'libphonenumber-js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { ArrowLeftCircle, ArrowRightCircle, MessageSquare, User, Phone } from 'lucide-react';

type Guest = { id: number; first_name: string; last_name: string; message: string };

export default function Home() {
  /* ---------------- state ---------------- */
  const [guests, setGuests] = useState<Guest[]>([]);
  const [form, setForm] = useState({ first_name: '', last_name: '', phone_number: '', message: '' });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  /* --------------- effects --------------- */
  useEffect(() => { fetchGuests(); }, []);

  async function fetchGuests() {
    try {
      const r = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/guests`);
      setGuests(await r.json());
    } catch (error) {
      console.error("Error fetching guests:", error);
    }
  }

  /* -------------- handlers -------------- */
  async function submit(e: React.FormEvent | React.MouseEvent) {
    e.preventDefault();
  
    // simple required checks
    if (!form.first_name || !form.last_name || !form.message) {
      alert("First, last, and message are required"); return;
    }
  
    // phone validation (if user typed one)
    if (form.phone_number) {
      const pn = parsePhoneNumberWithError(form.phone_number, "US");
      if (!pn?.isValid()) {
        alert("Please enter a valid phone number");
        return;
      }
    }
  
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/guests`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body:   JSON.stringify(form)
    });
  
    setForm({ first_name:'', last_name:'', phone_number:'', message:'' });
    fetchGuests();
  }

  /* ------------- carousel --------------- */
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  useEffect(() => {
    // Auto-advance every 5 seconds
    const interval = setInterval(() => {
      if (instanceRef.current) {
        instanceRef.current.next();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [instanceRef]);

  /* -------------- render ---------------- */
  return (
    <div className="min-h-screen flex flex-col">
      {/* ---------- header ---------- */}
      <header className="w-full bg-indigo-900 text-white py-6 text-center shadow-md">
        <h1 className="text-3xl font-bold tracking-wide flex items-center justify-center gap-2">
          <MessageSquare className="inline-block" size={28} />
          Guest Book
        </h1>
      </header>

      {/* ---------- hero + form ---------- */}
      <section className="relative bg-gray-100">
        {/* carousel images */}
        <div className="relative">
          <div ref={sliderRef} className="keen-slider h-96 overflow-hidden">
            <div className="keen-slider__slide bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <img 
                src="/raft1600900.jpg" 
                className="h-full w-full object-cover"
                alt="Rafting adventure"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/api/placeholder/1600/900";
                }}
              />
            </div>
            <div className="keen-slider__slide bg-gradient-to-r from-green-500 to-teal-600 flex items-center justify-center">
              <img 
                src="/Raft-AI-Capabilities-StarSage.jpg" 
                alt="Adventure placeholder" 
                className="h-full w-full object-cover" 
              />
            </div>
            <div className="keen-slider__slide bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center">
              <img 
                src="/Raft-Social-Featured-Image.jpg" 
                alt="Adventure placeholder" 
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          
          {loaded && instanceRef.current && (
            <div className="absolute inset-0 flex justify-between items-center px-4 z-10 pointer-events-none">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => instanceRef.current?.prev()}
                className="rounded-full bg-white/30 hover:bg-white/50 backdrop-blur-sm pointer-events-auto text-white shadow-lg"
              >
                <ArrowLeftCircle size={32} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => instanceRef.current?.next()}
                className="rounded-full bg-white/30 hover:bg-white/50 backdrop-blur-sm pointer-events-auto text-white shadow-lg"
              >
                <ArrowRightCircle size={32} />
              </Button>
            </div>
          )}
          
          {loaded && instanceRef.current && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {[...Array(instanceRef.current.track.details.slides.length)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => instanceRef.current?.moveToIdx(idx)}
                  className={`w-3 h-3 rounded-full ${currentSlide === idx ? 'bg-white' : 'bg-white/50'} transition-all`}
                />
              ))}
            </div>
          )}
        </div>

        {/* glassy card overlay */}
        <Card className="mx-auto w-full max-w-lg -mt-16 bg-white/80 backdrop-blur-md shadow-xl relative z-20 border-none">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold mb-6 text-center text-indigo-900">Sign Our Guestbook</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <User className="text-indigo-600" size={20} />
                <div className="flex-1 grid grid-cols-2 gap-4">
                  <Input 
                    placeholder="First name *" 
                    value={form.first_name}
                    onChange={e => setForm({...form, first_name: e.target.value})}
                    className="border-indigo-200 focus:border-indigo-500" 
                  />
                  <Input 
                    placeholder="Last name *" 
                    value={form.last_name}
                    onChange={e => setForm({...form, last_name: e.target.value})}
                    className="border-indigo-200 focus:border-indigo-500"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Phone className="text-indigo-600" size={20} />
                <Input 
                  placeholder="Phone number (optional)" 
                  value={form.phone_number}
                  onChange={e => setForm({...form, phone_number: e.target.value})}
                  className="border-indigo-200 focus:border-indigo-500"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <MessageSquare className="text-indigo-600" size={20} />
                <Input 
                  placeholder="Your message *" 
                  value={form.message}
                  onChange={e => setForm({...form, message: e.target.value})}
                  className="border-indigo-200 focus:border-indigo-500"
                />
              </div>
              
              <Button 
                onClick={submit}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Check In
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ---------- table ---------- */}
      <section className="py-12 px-6 flex-1 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center text-indigo-900">Recent Visitors</h2>
          
          {guests.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No guest entries yet. Be the first to sign our guestbook!
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="w-full border-collapse">
                <thead className="bg-indigo-50">
                  <tr>
                    <th className="py-3 px-6 text-left text-sm font-medium text-indigo-900">Name</th>
                    <th className="py-3 px-6 text-left text-sm font-medium text-indigo-900">Message</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {guests.map(g => (
                    <tr key={g.id} className="hover:bg-gray-50">
                      <td className="py-4 px-6 text-gray-800 font-medium">
                        {g.first_name} {g.last_name}
                      </td>
                      <td className="py-4 px-6 text-gray-600">{g.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* ---------- footer ---------- */}
      <footer className="w-full bg-gray-100 text-center py-6 border-t border-gray-200">
        <div className="max-w-5xl mx-auto">
          <p className="text-gray-600">© 2025 · Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <p className="text-gray-500 text-sm mt-2">Your memories are our priority.</p>
        </div>
      </footer>
    </div>
  );
}
// 'use client';

// import { useEffect, useState } from 'react';
// import { parsePhoneNumberWithError, ParseError } from 'libphonenumber-js';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Card, CardContent } from '@/components/ui/card';
// import { useKeenSlider } from 'keen-slider/react';
// import 'keen-slider/keen-slider.min.css';
// import { ArrowLeftCircle, ArrowRightCircle, MessageSquare, User, Phone } from 'lucide-react';

// type Guest = { id: number; first_name: string; last_name: string; message: string };

// export default function Home() {
//   /* ---------------- state ---------------- */
//   const [guests, setGuests] = useState<Guest[]>([]);
//   const [form, setForm] = useState({ first_name: '', last_name: '', phone_number: '', message: '' });
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [loaded, setLoaded] = useState(false);

//   /* --------------- effects --------------- */
//   useEffect(() => { fetchGuests(); }, []);

//   async function fetchGuests() {
//     try {
//       const r = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/guests`);
//       setGuests(await r.json());
//     } catch (error) {
//       console.error("Error fetching guests:", error);
//     }
//   }

//   /* -------------- handlers -------------- */
//   async function submit(e: React.FormEvent | React.MouseEvent) {
//     e.preventDefault();
  
//     // simple required checks
//     if (!form.first_name || !form.last_name || !form.message) {
//       alert("First, last, and message are required"); return;
//     }
  
//     // phone validation (if user typed one)
//     if (form.phone_number) {
//       const pn = parsePhoneNumberWithError(form.phone_number, "US");
//       if (!pn?.isValid()) {
//         alert("Please enter a valid phone number");
//         return;
//       }
//     }
  
//     await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/guests`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body:   JSON.stringify(form)
//     });
  
//     setForm({ first_name:'', last_name:'', phone_number:'', message:'' });
//     fetchGuests();
//   }

//   /* ------------- carousel --------------- */
//   const [sliderRef, instanceRef] = useKeenSlider({
//     initial: 0,
//     loop: true,
//     slideChanged(slider) {
//       setCurrentSlide(slider.track.details.rel);
//     },
//     created() {
//       setLoaded(true);
//     },
//   });

//   useEffect(() => {
//     // Auto-advance every 5 seconds
//     const interval = setInterval(() => {
//       if (instanceRef.current) {
//         instanceRef.current.next();
//       }
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [instanceRef]);

//   /* -------------- render ---------------- */
//   return (
//     <div className="min-h-screen flex flex-col">
//       {/* ---------- header ---------- */}
//       <header className="w-full bg-indigo-900 text-white py-6 text-center shadow-md">
//         <h1 className="text-3xl font-bold tracking-wide flex items-center justify-center gap-2">
//           <MessageSquare className="inline-block" size={28} />
//           Guest Book
//         </h1>
//       </header>

//       {/* ---------- hero + form ---------- */}
//       <section className="relative bg-gray-100">
//         {/* carousel images */}
//         <div className="relative">
//           <div ref={sliderRef} className="keen-slider h-96 overflow-hidden">
//             <div className="keen-slider__slide bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
//               <img 
//                 src="/raft1600900.jpg" 
//                 className="h-full w-full object-cover"
//                 alt="Rafting adventure"
//                 onError={(e) => {
//                   e.currentTarget.onerror = null;
//                   e.currentTarget.src = "/api/placeholder/1600/900";
//                 }}
//               />
//             </div>
//             <div className="keen-slider__slide bg-gradient-to-r from-green-500 to-teal-600 flex items-center justify-center">
//               <img 
//                 src="/Raft-AI-Capabilities-StarSage.jpg" 
//                 alt="Adventure placeholder" 
//                 className="h-full w-full object-cover" 
//               />
//             </div>
//             <div className="keen-slider__slide bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center">
//               <img 
//                 src="/Raft-Social-Featured-Image.jpg" 
//                 alt="Adventure placeholder" 
//                 className="h-full w-full object-cover"
//               />
//             </div>
//           </div>
          
//           {loaded && instanceRef.current && (
//             <div className="absolute inset-0 flex justify-between items-center px-4 z-10 pointer-events-none">
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={() => instanceRef.current?.prev()}
//                 className="rounded-full bg-white/30 hover:bg-white/50 backdrop-blur-sm pointer-events-auto text-white shadow-lg"
//               >
//                 <ArrowLeftCircle size={32} />
//               </Button>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={() => instanceRef.current?.next()}
//                 className="rounded-full bg-white/30 hover:bg-white/50 backdrop-blur-sm pointer-events-auto text-white shadow-lg"
//               >
//                 <ArrowRightCircle size={32} />
//               </Button>
//             </div>
//           )}
          
//           {loaded && instanceRef.current && (
//             <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
//               {[...Array(instanceRef.current.track.details.slides.length)].map((_, idx) => (
//                 <button
//                   key={idx}
//                   onClick={() => instanceRef.current?.moveToIdx(idx)}
//                   className={`w-3 h-3 rounded-full ${currentSlide === idx ? 'bg-white' : 'bg-white/50'} transition-all`}
//                 />
//               ))}
//             </div>
//           )}
//         </div>

//         {/* glassy card overlay */}
//         <Card className="mx-auto w-full max-w-lg -mt-16 bg-white/80 backdrop-blur-md shadow-xl relative z-20 border-none">
//           <CardContent className="p-8">
//             <h2 className="text-2xl font-semibold mb-6 text-center text-indigo-900">Sign Our Guestbook</h2>
//             <div className="space-y-4">
//               <div className="flex items-center space-x-2">
//                 <User className="text-indigo-600" size={20} />
//                 <div className="flex-1 grid grid-cols-2 gap-4">
//                   <Input 
//                     placeholder="First name *" 
//                     value={form.first_name}
//                     onChange={e => setForm({...form, first_name: e.target.value})}
//                     className="border-indigo-200 focus:border-indigo-500" 
//                   />
//                   <Input 
//                     placeholder="Last name *" 
//                     value={form.last_name}
//                     onChange={e => setForm({...form, last_name: e.target.value})}
//                     className="border-indigo-200 focus:border-indigo-500"
//                   />
//                 </div>
//               </div>
              
//               <div className="flex items-center space-x-2">
//                 <Phone className="text-indigo-600" size={20} />
//                 <Input 
//                   placeholder="Phone number (optional)" 
//                   value={form.phone_number}
//                   onChange={e => setForm({...form, phone_number: e.target.value})}
//                   className="border-indigo-200 focus:border-indigo-500"
//                 />
//               </div>
              
//               <div className="flex items-center space-x-2">
//                 <MessageSquare className="text-indigo-600" size={20} />
//                 <Input 
//                   placeholder="Your message *" 
//                   value={form.message}
//                   onChange={e => setForm({...form, message: e.target.value})}
//                   className="border-indigo-200 focus:border-indigo-500"
//                 />
//               </div>
              
//               <Button 
//                 onClick={submit}
//                 className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
//               >
//                 Check In
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       </section>

//       {/* ---------- table ---------- */}
//       <section className="py-12 px-6 flex-1 bg-white">
//         <div className="max-w-5xl mx-auto">
//           <h2 className="text-2xl font-semibold mb-6 text-center text-indigo-900">Recent Visitors</h2>
          
//           {guests.length === 0 ? (
//             <div className="text-center py-12 text-gray-500">
//               No guest entries yet. Be the first to sign our guestbook!
//             </div>
//           ) : (
//             <div className="bg-white rounded-lg shadow-md overflow-hidden">
//               <table className="w-full border-collapse">
//                 <thead className="bg-indigo-50">
//                   <tr>
//                     <th className="py-3 px-6 text-left text-sm font-medium text-indigo-900">Name</th>
//                     <th className="py-3 px-6 text-left text-sm font-medium text-indigo-900">Message</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {guests.map(g => (
//                     <tr key={g.id} className="hover:bg-gray-50">
//                       <td className="py-4 px-6 text-gray-800 font-medium">
//                         {g.first_name} {g.last_name}
//                       </td>
//                       <td className="py-4 px-6 text-gray-600">{g.message}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* ---------- footer ---------- */}
//       <footer className="w-full bg-gray-100 text-center py-6 border-t border-gray-200">
//         <div className="max-w-5xl mx-auto">
//           <p className="text-gray-600">© 2025 · Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//           <p className="text-gray-500 text-sm mt-2">Your memories are our priority.</p>
//         </div>
//       </footer>
//     </div>
//   );
// }