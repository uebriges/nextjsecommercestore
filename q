[33mcommit 6aa32d334a07d0d1cceac90257b8980a649cecf5[m[33m ([m[1;36mHEAD -> [m[1;32mbranch1[m[33m, [m[1;31morigin/branch1[m[33m)[m
Author: Uebriges <uebriges@gmx.at>
Date:   Mon Mar 1 13:45:43 2021 +0100

    Add Github actions

[33mcommit dca5f938e4788555a14df2bcf8bb3d63eb0f4850[m
Author: Uebriges <uebriges@gmx.at>
Date:   Mon Mar 1 13:31:33 2021 +0100

    Add cypress and first unit tests

[33mcommit bde993926b1a515c11b8fdd212b2233b7213f936[m
Author: Uebriges <uebriges@gmx.at>
Date:   Mon Mar 1 08:18:13 2021 +0100

    Add end to end tests

[33mcommit f0f8d16d3eaf608d166e4d8c45ad98f425f001a8[m
Author: Uebriges <uebriges@gmx.at>
Date:   Sun Feb 28 16:39:29 2021 +0100

    Switch some files to TypeScript. Not finished yet.

[33mcommit 70757fc455c4638a3901e64165d08eadafc0f6a0[m
Author: Uebriges <uebriges@gmx.at>
Date:   Fri Feb 26 18:47:35 2021 +0100

    Add displaying the username on all pages.

[33mcommit bf9c9a78fc0fee14b0a8f582e44196248b6f490d[m
Author: Uebriges <uebriges@gmx.at>
Date:   Fri Feb 26 16:44:09 2021 +0100

    Add logout

[33mcommit ae55156445a23e32e34e242235b8f6cb8f06b091[m
Author: Uebriges <uebriges@gmx.at>
Date:   Fri Feb 26 15:13:02 2021 +0100

    Add user name in header and fix server side rendering bugs

[33mcommit 548da1bd9dca51961f8bb92079ec1d014e275f88[m
Author: Uebriges <uebriges@gmx.at>
Date:   Thu Feb 25 19:23:43 2021 +0100

    Add delete and update product (without pictures)

[33mcommit ea956846ab25649d7d9e6154618e36ada251d051[m
Author: Uebriges <uebriges@gmx.at>
Date:   Thu Feb 25 14:27:05 2021 +0100

    Add Logout and session token handling

[33mcommit aa05716bc2fa43d6e6b075b8db3b42d3c2bfb3da[m
Author: Uebriges <uebriges@gmx.at>
Date:   Wed Feb 24 18:43:02 2021 +0100

    Add login. Session token still needs to be written to cookies.

[33mcommit 2b31f0c4c61f14d579bdabe49b24eddeb408d8f5[m
Author: Uebriges <uebriges@gmx.at>
Date:   Wed Feb 24 15:19:24 2021 +0100

    Add registration. Login is not finished yet.

[33mcommit 6c9fe4572c76ddca56c838f2c5c301613e46f8c1[m
Author: Uebriges <uebriges@gmx.at>
Date:   Tue Feb 23 14:33:07 2021 +0100

    Add login page + extend migration for sessions

[33mcommit 44d52981e7c4f472c09b9b88eb59c2f8c7b01060[m
Author: Uebriges <uebriges@gmx.at>
Date:   Mon Feb 22 22:10:19 2021 +0100

    Add migration (empty tables)

[33mcommit 9e96bee1205fe12c956759d7fb069f82660bc340[m
Author: Uebriges <uebriges@gmx.at>
Date:   Mon Feb 22 18:43:40 2021 +0100

    Fix some issues: Thankyou + shopping cart page

[33mcommit ae71842b57a13996e7c1399e843a34a035ce0b3b[m
Author: Uebriges <uebriges@gmx.at>
Date:   Mon Feb 22 16:38:29 2021 +0100

    Add functionality to store order and it's products

[33mcommit cb51d739931c155efc2a1b53246fccf24fa1f7a5[m
Author: Uebriges <uebriges@gmx.at>
Date:   Mon Feb 22 13:37:09 2021 +0100

    Reduced complexity of shopping cart (final part)

[33mcommit 9ac73fcf1ca3fcf219cad72c5a36a0c8fc3ab993[m
Author: Uebriges <uebriges@gmx.at>
Date:   Mon Feb 22 13:26:38 2021 +0100

    Remove manual quantity change and reduce complexity (part 2)

[33mcommit 06bd806d6d6abbe4f3b6febfad2afbcd139d5bd9[m
Author: Uebriges <uebriges@gmx.at>
Date:   Mon Feb 22 12:46:27 2021 +0100

    Reduce complexity for increasing/decreasing quantity in shopping cart (part 1)

[33mcommit 6f57f25cf1413ddb1a67665f4920b67e5436033d[m
Author: Uebriges <uebriges@gmx.at>
Date:   Mon Feb 22 10:52:48 2021 +0100

    Add initial checkout and thank you page. SSR after deletion of product in shopping cart still problematic.

[33mcommit ac80d6bd92b0ba2a8d1d67a5d1d1453b8ac3bee6[m
Author: Uebriges <uebriges@gmx.at>
Date:   Fri Feb 19 13:49:19 2021 +0100

    Add deletion of shopping cart product entry. Rerender of shopping cart after deletion doesn't work yet.

[33mcommit 6de05cf3544b4db3d646f397b94a4d0f0ffafa0c[m
Author: Uebriges <uebriges@gmx.at>
Date:   Thu Feb 18 15:52:52 2021 +0100

    Add shopping cart functionality
    
    - Current list of products including quantity shown in the shopping cart
    - Quantity can be changed

[33mcommit 52b510620eab9b75c3ce15a7b1f04ee9a01ff57e[m
Author: Uebriges <uebriges@gmx.at>
Date:   Thu Feb 18 08:30:01 2021 +0100

    Add db query for addtional information for shopping cart entries (image, product name etc.)

[33mcommit d0c3671803af7b732af6e078399b6891806900dc[m
Author: Uebriges <uebriges@gmx.at>
Date:   Wed Feb 17 13:23:34 2021 +0100

    Add functionality to sum up total number of items in the shopping cart. First attempt.

[33mcommit 4372e2b711b352688c05afb58f49577299757ded[m
Author: Uebriges <uebriges@gmx.at>
Date:   Wed Feb 17 05:56:58 2021 +0100

    Add cookie functionality to fill the shopping cart. Basic setup for shopping cart page

[33mcommit 47cfaa246586b27f09df226e201a1c2699ab1f2d[m
Author: Uebriges <uebriges@gmx.at>
Date:   Tue Feb 16 18:53:39 2021 +0100

    Add dabase connection, single prodcut site, custom 404 page, conditional rendering
    
    - conditional rendering: added some first conditions (currently simply set to true or false)
    for adding admin functionality later.

[33mcommit 98f9145240ebebebd02d537bc1642c39ef5e6271[m
Author: Uebriges <uebriges@gmx.at>
Date:   Mon Feb 15 08:57:54 2021 +0100

    Setup some initial styling and structure #7

[33mcommit a28667e5ddecbc1000935c38a8227ffdd24d98a3[m
Author: Uebriges <uebriges@gmx.at>
Date:   Sun Feb 14 19:38:54 2021 +0100

    Setup connection to database, dotenv and camelcaseKeys

[33mcommit 4171bffc1dc57d81b176e1aa8525367cf94cff65[m
Author: Uebriges <uebriges@gmx.at>
Date:   Sun Feb 14 18:53:00 2021 +0100

    Add inital database setup
    
    - Create tables
    - Insert inital values
    - Create dump of inital values in the database

[33mcommit e078184e8406d2f365641073a53a69d631632d61[m[33m ([m[1;31morigin/main[m[33m, [m[1;32mmain[m[33m)[m
Author: Uebriges <uebriges@gmx.at>
Date:   Wed Feb 10 12:53:46 2021 +0100

    Add inital project files
