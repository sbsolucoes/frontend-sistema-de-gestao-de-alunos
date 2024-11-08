import { NextResponse } from 'next/server';

export function middleware(request) {
  const sessionToken = request.cookies.get('next-auth.session-token')?.value;

 // Verifica se a URL é a página de login
 const isLoginPage = request.nextUrl.pathname === '/';

 // Redireciona o usuário não autenticado para a página de login se não estiver acessando a página de login
 if (!sessionToken && !isLoginPage) {
   return NextResponse.redirect(new URL('/', request.url)); 
 }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'], 
};
