import NavigationAdmin from './Navigation';
import { ADMIN_NAV_LINKS } from '@/lib/constants'; // Importa os links de navegação
import { cn } from '@/utils/formats-functions';

export default function HeaderAdmin() {
  return (
    <header // Usar <header> para semântica
      className={cn(
        'flex justify-between items-center',
        'px-4 sm:px-6 md:px-10 my-8 sm:my-10 md:my-12', // Responsividade no padding e margem vertical
        'w-full gap-2',
      )}
    >
      <h1 className="text-2xl sm:text-3xl font-bold" title="NEXA admin">
        {' '}
        {/* Responsividade na fonte */}
        NEXA admin
      </h1>
      <NavigationAdmin
        linkNavigation={ADMIN_NAV_LINKS} // Usa a constante
      />
      <div>User😎</div> {/* Renderiza children ou um fallback */}
    </header>
  );
}
