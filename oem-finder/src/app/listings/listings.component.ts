import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Listing {
    id: number;
    title: string;
    category: string;
    description: string;
    price: string;
    image: string;
    link: string;
}

@Component({
    selector: 'app-listings',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './listings.component.html',
    styleUrls: ['./listings.component.scss'],
})
export class ListingsComponent {
    categoriesOpen = true;
    selectedCategory = '';
    searchInput = '';
    appliedSearch = '';

    readonly listings: Listing[] = [
        {
            id: 1,
            title: 'Praca sezonowa',
            category: 'Praca',
            description:
                'Poszukujemy osób do pracy sezonowej. Elastyczne godziny i atrakcyjne wynagrodzenie.',
            price: '32 zł / godz.',
            image: '/images/praca-sezonowa.jpg',
            link: '/listings/1',
        },
        {
            id: 2,
            title: 'Korepetycje z matematyki',
            category: 'Edukacja',
            description:
                'Korepetycje dla uczniów szkoły podstawowej i średniej. Zajęcia stacjonarne lub online.',
            price: '60 zł / godz.',
            image: '/images/korepetycje.jpg',
            link: '/listings/2',
        },
    ];

    get categories(): string[] {
        return [...new Set(this.listings.map((listing) => listing.category))];
    }

    get filteredListings(): Listing[] {
        const query = this.appliedSearch.trim().toLocaleLowerCase('pl-PL');

        return this.listings.filter((listing) => {
            const matchesCategory =
                !this.selectedCategory || listing.category === this.selectedCategory;

            const text =
                `${listing.title} ${listing.category} ${listing.description}`
                    .toLocaleLowerCase('pl-PL');

            return matchesCategory && (!query || text.includes(query));
        });
    }

    onSearchInput(event: Event): void {
        this.searchInput = (event.target as HTMLInputElement).value;
    }

    applySearch(): void {
        this.appliedSearch = this.searchInput;
    }

    clearFilters(): void {
        this.selectedCategory = '';
        this.searchInput = '';
        this.appliedSearch = '';
    }
}