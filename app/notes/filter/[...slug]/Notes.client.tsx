'use client';

import React, { useState } from 'react';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import styles from '../../NotesPage.module.css';
import { useDebounce } from 'use-debounce';
import Link from 'next/link';

interface NotesClientProps {
  initialTag: string;
}

const PER_PAGE = 12;

export default function NotesClient({ initialTag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', initialTag, page, PER_PAGE, debouncedSearch],
    queryFn: () =>
      fetchNotes(
        debouncedSearch,
        page,
        12,
        initialTag === 'all' ? undefined : initialTag
      ),
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={styles.app}>
      <header className={styles.toolbar}>
        <SearchBox
          value={search}
          onSearch={query => {
            setSearch(query);
            setPage(1);
          }}
        />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
        <Link href="/notes/action/create" className={styles.button}>
          Create note +
        </Link>
      </header>

      <main>
        {isLoading && <p>Loading notes...</p>}
        {isError && <p>Error loading notes.</p>}
        {data && <NoteList notes={notes} />}
      </main>
    </div>
  );
}
