function clear() {
  const terminal = document.getElementById("terminal-content");
  while (terminal.firstChild) {
    terminal.removeChild(terminal.lastChild);
  }
  writePrompt();
  return true;
}

function help(input) {
  if (!input || !input.length) {
    return Object.keys(COMMANDS).map((cmd) => ({ key: cmd, type: types.LINK }));
  }
  return COMMANDS[input[0]].help;
}

function failure(input) {
  let output = "System Failure";

  for (let i =0; i < 8; i++) {
    output += output;
  }

  return output;
}

function logo() {
  let logo = "                      +&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@Q|                      \n";
  logo += "                    ;%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@Q=                    \n";
  logo += "                  ;&@@@QL`                             ;&@@@Q|                  \n";
  logo += "                +&@@@QL`    ,Liiiiiiiiiiiiiiiiiiiii~     ;%@@@Q|                \n";
  logo += "              +&@@@QL`  :*  ,@@@@@@@@@@@@@@@@@@@@@@;  :L`  ;%@@@Q|              \n";
  logo += "            ;%@@@Qz`  ,w@@Z  -+LLLLLL|?~~=???|||?=,  `Q@Qc`  ;&@@@Q=            \n";
  logo += "          ;&@@@QL`  '4@@@U~,  j@@@@@@@@^`@@@@@@@@D  `~=B@@@c`  ;&@@@Q|          \n";
  logo += "        +&@@@QL`  'X@@@U~zQ@c  =|||||||- >||||||*. `D@B>=&@@@J`  ;%@@@Q|        \n";
  logo += "      +&@@@QL`    l@@$~z@@@R~   wQQQQQQQQQQQQQQS    \Q@@B=^&@Q;    ;R@@@Q|      \n";
  logo += "    ;%@@@Qz`  'Z@p:'~iQ@@&+~$$  ,pRRRRRRRRRRRRK,  rQ},J@@@&,~`=&Qc`  ;N@@@Q=    \n";
  logo += "  ;&@@@QL`  '3@@@A~zQ@@&;~p@@@;                   X@@@},JWv`^^+B@@@c`  ;N@@@Q|  \n";
  logo += "+&@@@QL`  'P@@@p~1Q@@B;~D@@@y'    `_rLzJtzi+~`     ~O@@Q`  %@@&==B@@@J`  ;R@@@Q|\n";
  logo += "@@@@L`   z@@@p~1@@@0;~D@@@o.  `>kQ@@@@@@@%o)?+,      :+`|8a,iQ@@&+^&@@Q:   ;&@@@\n";
  logo += "@@@%      ,*:,Q@@Q*~$@@@3'  ~w@@@@@@@@RL|a00U:    ~;   '0@@@},1Q@@D ;;`     z@@@\n";
  logo += "@@@%   iK}~   `;~ *@@@Z'  ,R@@@@@@@@Q;^Q@@@@@@0jz^:@N;   ;D@@N.`;,   ~sU_   z@@@\n";
  logo += "@@@%   a@@U,@BV`   `~'   L@@@@@@@@@@;`@@@@@@@@@@@@NQ@@x    '`   '}bK &@@+   z@@@\n";
  logo += "@@@%   3@@U~@@@'sQ$^    }@@@@@@@@@@@'~@@@@@@@@@@@@@@@@@P    ipQ;=@@Q B@@=   z@@@\n";
  logo += "@@@%   j@@A~@@@'V@@U   ~@@@@@@@@@@@@;`@@@@@@@@@@@@@@@@@@r   @@@+>@@Q B@@=   z@@@\n";
  logo += "@@@%   j@@K~@@@'Z@@U   K@@@@@@@@@@@@@` @@@@@@@@@@@@@@@@@N   @@@+=@@Q B@@+   z@@@\n";
  logo += "@@@%   j@@K`tFt`;sx^  `@@@@@@@@@@@@@@@@; `@@@@@@@@@@@@@@@'  3Uk,*@@Q B@@+   z@@@\n";
  logo += "@@@%   j@@K`akm`;XX|  `@@@@@@@@@@@@@@@@@`  `@@@@@@@@@@@@@'  Ltz-|@@Q B@@r   z@@@\n";
  logo += "@@@%   j@@K,@@@'j@@p   ky@@@@@@@@@@@@@@@3'   `@@@@@@@@@@@  `@@@^L@@B Q@@^   z@@@\n";
  logo += "@@@%   j@@O,@@@,j@@A   ;,'U@@@@@@@@@@@@@@@C    `@@@@@@@@?  `@@@^L@@B Q@@^   z@@@\n";
  logo += "@@@%   j@@D'@@@,lQK+    |' ;X@@@@@@@@@@@@@@1    `@@@@@@$    JRQ;L@@& Q@@^   z@@@\n";
  logo += "@@@%   j@@D-QDu`         |=  `|O@@@@@@@@@@@l      `@@@j    '    ~DQR Q@@^   z@@@\n";
  logo += "@@@%   |%3;   `' ,p@@u`   ~z-    :=@@@@@@@:        1@=   ?Q@QF `.    LOQ~   z@@@\n";
  logo += "@@@%      ,.`D@@d~;8@@@F`   ;=~                  ,=r   ?Q@@QL,w@@Q;`:`      z@@@\n";
  logo += "@@@Q'   ^Q@@w~F@@@%~;R@@@F.   '^;;'          `:~;'   |Q@@Q|:P@@@X;z@@@{    `k@@@\n";
  logo += "?Q@@@G'  ,h@@@m~C@@@3 ;R@@@s`     .~~~~~~~~_:'    `lQ@@Q+,h@@@G;}@@@&+   `iQ@@Ql\n";
  logo += "  |Q@@@o.  ~K@@@j~J|`rS~+&@@@i                   ~Q@@Q|,h@@@A;1Q@@Q+    iQ@@@F` \n";
  logo += "    |Q@@@3'  ,b@Q+ `+@@@p~;B@*  ;jyyyy^ >jjjjj+  `DQ?,k@@@$~tQ@@8^    iQ@@@l`   \n";
  logo += "      |Q@@@3'  - =Q@o~j@@@D:`  `@@@@@@j U@@@@@@;   ,X@@@4~t@@@g^   `\Q@@Ql`     \n";
  logo += "        |Q@@@G'  ,U@@@o~y@@S  ';r+++++;;;^^^^^^;-  t@@V~j@@@0;   `\Q@@Ql`       \n";
  logo += "          |Q@@@3.  ;D@@@F~|  -@@@@@@@@@@@@@@@@@@Q.  ^~F@@@&;    \Q@@@F`         \n";
  logo += "            |Q@@@3'  ~D@@N   '?||||LLL*>?||||||||'   j@@%;    \Q@@@l`           \n";
  logo += "              |Q@@@3'  ~j'  y@@@@@@@@@j K@@@@@@@@@w   1;   `cQ@@Ql`             \n";
  logo += "                |Q@@@h'    `Fjjjjjjjjj; +jjjjjjjjj}`     `c@@@Ql`               \n";
  logo += "                 `|Q@@@3.                               cQ@@@F`                 \n";
  logo += "                   `|Q@@@KUUUUUUUUUUUUUUUUUUUUUUUUUUUU$Q@@@l`                   \n";
  logo += "                      |Q@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@Ql`                     \n";

  return logo;
}