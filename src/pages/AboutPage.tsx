import { Box, Heading, Text, Link, Image, VStack, SimpleGrid } from '@chakra-ui/react';
import type { FC } from 'react';
import { hoverStyles } from '@/theme/theme';

type TeamMember = {
  nickname: string;
  fullName: string;
  bio: string;
  github: string;
  photo: string;
  contribution: string;
};

const GRID_COLUMNS_SMALL = 1;
const GRID_COLUMNS_MEDIUM = 2;
const GRID_COLUMNS_LARGE = 3;
const CARD_GAP = 3.2;
const GRID_GAP = 10;
const ROTATION_ANGLE_RIGHT = 2;

const team: TeamMember[] = [
  {
    nickname: 'Nadin',
    fullName: 'Nadezhda Novoselova',
    bio: 'A guiding spark behind the project’s concept, structure, and team rhythm. Balanced hands-on coding with thoughtful coordination and integration work.',
    github: 'https://github.com/Nadin-Nov',
    photo: '/assets/Nadin.JPG',
    contribution:
      'Role: Team Lead & Integration Specialist. Worked across all parts of the app — from features and layout to Commercetools integration and team organization.',
  },
  {
    nickname: 'Alvorie',
    fullName: 'Alena Volf',
    bio: 'Blended structure and aesthetics into one vision. Helped shape the architecture while also designing a user-friendly and consistent interface.',
    github: 'https://github.com/alvorie',
    photo: '/assets/Alena.JPG',
    contribution:
      'Role: UI Architect. Contributed to all areas of the project, especially focusing on frontend structure, Figma designs, component logic, and catalog implementation.',
  },
  {
    nickname: 'Gnarkill33',
    fullName: 'Ekaterina Podorova',
    bio: 'Brought clarity to the user journey and stability to the app’s flow. A quiet force behind the logic that makes everything feel seamless.',
    github: 'https://github.com/Gnarkill33',
    photo: '/assets/Kate.JPG',
    contribution:
      'Role: User Flow & Integration. Collaborated across the stack, especially focusing on authentication, profile management, and backend data consistency.',
  },
];

const AboutPage: FC = () => {
  return (
    <Box
      minH='100vh'
      bgImage="url('/assets/background_about.webp')"
      bgRepeat='no-repeat'
      bgSize='cover'
      bgPos='center'
      maxW='1440px'
      mx='auto'
      px={4}
      py={8}
    >
      <Heading mb={6} fontSize='3xl' textAlign='center' color='lightText.default' textShadow='0 0 10px rgba(0,0,0,0.7)'>
        About the Memory Shop Team
      </Heading>

      <Text mb={10} fontSize='lg' textAlign='center' color='lightText.default' textShadow='0 0 10px rgba(0,0,0,0.7)'>
        We’re a close-knit team where everyone pitched in — no strict roles, just a shared passion to create something
        meaningful.
      </Text>

      <SimpleGrid
        columns={{
          base: GRID_COLUMNS_SMALL,
          md: GRID_COLUMNS_MEDIUM,
          lg: GRID_COLUMNS_LARGE,
        }}
        gridGap={GRID_GAP}
        justifyItems='center'
      >
        {team.map((member, index) => {
          const githubUsername = member.github.split('https://github.com/')[1];
          return (
            <VStack
              key={index}
              align='center'
              gap={CARD_GAP}
              bg='lightText.default'
              border='8px solid'
              borderColor='lightText.default'
              borderBottomWidth='32px'
              borderRadius='md'
              boxShadow='md'
              p={3.5}
              maxW='300px'
              transform={`rotate(${(index - 1) * ROTATION_ANGLE_RIGHT}deg)`}
              _hover={{
                transform: 'rotate(0deg) scale(1.05)',
                transition: '0.3s ease',
              }}
              cursor='pointer'
            >
              <Box overflow='hidden' width='100%' height='250px' borderRadius='md' boxShadow='md'>
                <Image
                  src={member.photo}
                  alt={`${member.nickname} photo`}
                  objectFit='cover'
                  width='100%'
                  height='100%'
                />
              </Box>

              <Heading size='sm' color='darkText.default' textAlign='center' w='full' mt={3}>
                {member.nickname}
              </Heading>
              <Text fontSize='xs' color='darkText.subtle' mb={1} textAlign='center' w='full'>
                {member.fullName}
              </Text>
              <Text fontSize='xs' color='darkText.default' textAlign='center' w='full'>
                {member.bio}
              </Text>
              <Text fontSize='xs' color='darkText.subtle' mt={1} textAlign='center' w='full'>
                <strong>Contribution:</strong> {member.contribution}
              </Text>

              <Link
                href={member.github}
                target='_blank'
                rel='noopener noreferrer'
                display='flex'
                alignItems='center'
                gap={1.5}
                mt={1}
              >
                <Image
                  src={`https://github.com/${githubUsername}.png`}
                  alt={`${member.nickname} GitHub avatar`}
                  boxSize='20px'
                  borderRadius='full'
                />
                <Text fontSize='xs' fontWeight='bold' color='link.default' {...hoverStyles.linkHover}>
                  {githubUsername}
                </Text>
              </Link>
            </VStack>
          );
        })}
      </SimpleGrid>

      <Box
        mt={16}
        textAlign='center'
        maxW='3xl'
        mx='auto'
        color='lightText.default'
        textShadow='0 0 10px rgba(0,0,0,0.7)'
      >
        <Text fontSize='lg' mb={3}>
          This project was created as part of the frontend development course at RS School — a place where knowledge
          meets creativity, and every line of code carries a spark of magic. The school inspired us to dream bigger and
          craft digital stories that feel alive.
        </Text>
        <Link
          href='https://rs.school'
          target='_blank'
          rel='noopener noreferrer'
          display='inline-block'
          mt={6}
          _hover={{ transform: 'scale(1.05)' }}
          transition='0.3s'
        >
          <Image
            src='/assets/logo-rsschool3.png'
            alt='RS School Logo'
            mx='auto'
            h='20px'
            filter='invert(1) drop-shadow(0 0 2px rgba(0,0,0,0.7))'
          />
        </Link>
      </Box>
    </Box>
  );
};

export default AboutPage;
