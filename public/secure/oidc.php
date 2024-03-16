<html>
   <body>
      <h1>If you can see this, the OIDC login procedure was successful.</h1>
    <a href="/protected_by_oidc_rp.php/callback?logout=%2Findex.html">Logout</a>
      <H2>OIDC ID TOKEN PAYLOAD:</H2>
      <pre><?php echo str_replace(' ', '&nbsp;', (json_encode(json_decode($_SERVER['OIDC_id_token_payload']), JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES))); ?> </pre>
      <H2>All content</H2>
      <pre><?php print_r($_SERVER); ?></pre>
   </body>
</html>