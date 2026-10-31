// Articles du blog : un fichier .mdx exporte un composant React par défaut.
declare module "*.mdx" {
  import type { MDXContent } from "mdx/types";
  const Contenu: MDXContent;
  export default Contenu;
}
