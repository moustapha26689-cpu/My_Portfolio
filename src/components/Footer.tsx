'use client';

import { useTranslations } from 'next-intl';
import { Link } from 'react-scroll';
import { PhoneIcon, EnvelopeIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export default function Footer() {
  const tNav = useTranslations('nav');
  const tContact = useTranslations('contact');

  const rawPhone = tContact('phone', { defaultValue: '+212 710-928562' });
  const cleanPhone = rawPhone.replace(/[^0-9+]/g, '');
  const rawEmail = tContact('email', { defaultValue: 'moustapha26689@gmail.com' });
  const rawWhatsapp = tContact('whatsapp', { defaultValue: '+212710928562' });
  const cleanWhatsapp = rawWhatsapp.replace(/[^0-9]/g, '');

  const navItems = [
    { key: 'home', href: 'hero' },
    { key: 'about', href: 'about' },
    { key: 'skills', href: 'skills' },
    { key: 'education', href: 'education' },
    { key: 'experience', href: 'experience' },
    { key: 'certifications', href: 'certifications' },
  ];

  return (
    <footer className="bg-[#0c0827] text-white py-16 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Column 1: Identity */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-[#1a1145] to-[#4a00e0] rounded-xl flex items-center justify-center text-white font-extrabold text-base shadow-md">
                M
              </div>
              <h3 className="text-2xl font-black tracking-tight">Mouhamadou Moustapha Fall</h3>
            </div>
            <p className="text-slate-400 mb-4 text-sm leading-relaxed">
              Collaborateur Comptable @TPA | Diplômé ENCG Fès.
            </p>
            <p className="text-slate-500 text-xs font-semibold">
              © {new Date().getFullYear()} Mouhamadou Moustapha Fall. Tous droits réservés.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-extrabold uppercase tracking-wider text-amber-400 mb-5">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {navItems.map((item) => (
                <li key={item.key}>
                  <Link
                    to={item.href}
                    smooth={true}
                    offset={-80}
                    duration={500}
                    className="text-slate-300 hover:text-amber-300 flex items-center gap-1.5 cursor-pointer transition-colors text-sm font-semibold"
                  >
                    <ChevronRightIcon className="w-3.5 h-3.5 text-amber-400" />
                    <span>{tNav(item.key)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info (All Clickable: Phone, WhatsApp, Email) */}
          <div>
            <h4 className="text-lg font-extrabold uppercase tracking-wider text-amber-400 mb-5">
              Contact Direct
            </h4>
            <ul className="space-y-3.5 text-sm font-semibold">
              
              {/* Phone */}
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-slate-800 text-amber-400 flex items-center justify-center flex-shrink-0">
                  <PhoneIcon className="w-4 h-4" />
                </span>
                <a 
                  href={`tel:${cleanPhone}`} 
                  className="text-slate-300 hover:text-amber-300 transition-colors"
                  title="Appeler directement"
                >
                  {rawPhone}
                </a>
              </li>

              {/* WhatsApp */}
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-slate-800 text-[#25D366] flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </span>
                <a 
                  href={`https://wa.me/${cleanWhatsapp}`} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-[#25D366] transition-colors"
                  title="Discuter sur WhatsApp"
                >
                  WhatsApp ({rawPhone})
                </a>
              </li>

              {/* Email */}
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-slate-800 text-amber-400 flex items-center justify-center flex-shrink-0">
                  <EnvelopeIcon className="w-4 h-4" />
                </span>
                <a 
                  href={`mailto:${rawEmail}`} 
                  className="text-slate-300 hover:text-amber-300 transition-colors break-all"
                  title="Envoyer un email"
                >
                  {rawEmail}
                </a>
              </li>

            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
}
